"use client";

import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { Box, Button, Paper, Typography } from "@mui/material";
import { PlayArrow, Refresh } from "@mui/icons-material";
import * as ts from "typescript";

interface CodeEditorProps {
  initialCode?: string;
  onCodeChange?: (code: string) => void;
}

const defaultCode = `// sample function

function sum(n: number, m: number): number {
  return n + m;
}

// Sample test
const n = 2;
const m = 3;
const target = 5;
const result = sum(n, m);
console.log(\`n: \${n}\`);
console.log(\`m: \${m}\`);
console.log(\`\${n + m == target ? 'it works' : 'it doesn work'}\`);
console.log(\`sum: \${result}\`);
`;

type EditorInstance = editor.IStandaloneCodeEditor | null;

const executeCode = (compiledCode: string): string => {
  const logs: string[] = [];
  const originalLog = console.log;
  console.log = (...args: unknown[]) => {
    logs.push(args.map(arg => String(arg)).join(" "));
    originalLog(...args);
  };

  try {
    // eslint-disable-next-line no-eval
    eval(compiledCode);
    return logs.join("\n") || "Código ejecutado correctamente.";
  } catch (runtimeError) {
    const errorMessage =
      runtimeError instanceof Error
        ? runtimeError.message
        : String(runtimeError);
    return `Error en tiempo de ejecución: ${errorMessage}`;
  } finally {
    console.log = originalLog;
  }
};

const getTypeScriptErrors = (code: string): string[] => {
  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ES2020,
    lib: ["ES2020", "DOM"],
    strict: false,
    skipLibCheck: true,
    noEmit: true,
    types: [],
  };

  // Crear un CompilerHost completamente personalizado (sin usar ts.createCompilerHost)
  // porque ts.sys no está disponible en navegadores
  const compilerHost: ts.CompilerHost = {
    getSourceFile: (fileName, languageVersion) => {
      if (fileName === "temp.ts") {
        return ts.createSourceFile(
          fileName,
          code,
          languageVersion || ts.ScriptTarget.ES2020
        );
      }
      // Para archivos de librería (lib.d.ts, etc.), crear un source file vacío
      // ya que skipLibCheck está activado y no necesitamos las definiciones reales
      if (fileName.endsWith(".d.ts") || fileName.includes("lib.")) {
        return ts.createSourceFile(
          fileName,
          "// Library definitions skipped",
          languageVersion || ts.ScriptTarget.ES2020
        );
      }
      return undefined;
    },
    getDefaultLibFileName: _options => {
      // Retornar un nombre de librería estándar (no se carga realmente con skipLibCheck)
      return "lib.d.ts";
    },
    writeFile: () => {
      // No escribir archivos en el navegador
    },
    getCurrentDirectory: () => "",
    getDirectories: () => [],
    getCanonicalFileName: fileName => fileName,
    getNewLine: () => "\n",
    useCaseSensitiveFileNames: () => false,
    fileExists: fileName => fileName === "temp.ts",
    readFile: fileName => {
      if (fileName === "temp.ts") {
        return code;
      }
      return undefined;
    },
  };

  const program = ts.createProgram(["temp.ts"], compilerOptions, compilerHost);

  const diagnostics = ts.getPreEmitDiagnostics(program);
  return diagnostics
    .map(diagnostic => {
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        "\n"
      );
      if (diagnostic.file && diagnostic.start !== undefined) {
        const { line, character } =
          diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        return `Línea ${line + 1}, Columna ${character + 1}: ${message}`;
      }
      return message;
    })
    .filter(error => {
      // Filtrar errores relacionados con librerías y tipos globales
      // que son esperados en el navegador
      const lowerError = error.toLowerCase();
      return (
        !lowerError.includes("cannot find global type") &&
        !lowerError.includes("could not resolve the path") &&
        !lowerError.includes("library") &&
        !lowerError.includes("es2020") &&
        !lowerError.includes("dom") &&
        !(
          lowerError.includes("cannot find name 'console'") &&
          lowerError.includes("do you need to change")
        )
      );
    });
};

const compileTypeScript = (code: string): string => {
  return ts.transpile(code, {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ES2020,
    lib: ["ES2020"],
  });
};

export function CodeEditor({ initialCode, onCodeChange }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode || defaultCode);
  const [output, setOutput] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const editorRef = useRef<EditorInstance>(null);

  // Actualizar código cuando cambia initialCode
  React.useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
      setOutput("");
      setErrors([]);
    }
  }, [initialCode]);

  const handleEditorDidMount = (
    editorInstance: editor.IStandaloneCodeEditor
  ) => {
    editorRef.current = editorInstance;
  };

  const compileAndRun = () => {
    try {
      setErrors([]);
      setOutput("");

      const compiledCode = compileTypeScript(code);
      const executionOutput = executeCode(compiledCode);
      setOutput(executionOutput);

      const typeErrors = getTypeScriptErrors(code);
      if (typeErrors.length > 0) {
        setErrors(typeErrors);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setErrors([`Error de compilación: ${errorMessage}`]);
    }
  };

  const resetCode = () => {
    setCode(defaultCode);
    setOutput("");
    setErrors([]);
    if (onCodeChange) {
      onCodeChange(defaultCode);
    }
  };

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || "";
    setCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  return (
    <CodeEditorUI
      code={code}
      output={output}
      errors={errors}
      onCodeChange={handleCodeChange}
      onMount={handleEditorDidMount}
      onRun={compileAndRun}
      onReset={resetCode}
    />
  );
}

const ErrorDisplay = ({ errors }: { errors: string[] }) => {
  if (errors.length === 0) return null;

  return (
    <Box
      sx={{
        mb: 2,
        p: 2,
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        borderRadius: "4px",
        border: "1px solid rgba(239, 68, 68, 0.5)",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ color: "#fca5a5", mb: 1, fontWeight: "bold" }}
      >
        Errores de TypeScript:
      </Typography>
      {errors.map((error, index) => (
        <Typography
          key={index}
          variant="body2"
          sx={{
            color: "#fca5a5",
            fontFamily: "monospace",
            fontSize: "0.85rem",
            mb: 0.5,
          }}
        >
          • {error}
        </Typography>
      ))}
    </Box>
  );
};

const OutputDisplay = ({ output }: { output: string }) => {
  if (!output) return null;

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "4px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ color: "#ffffff", mb: 1, fontWeight: "bold" }}
      >
        Salida:
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#a3e635",
          fontFamily: "monospace",
          fontSize: "0.9rem",
          whiteSpace: "pre-wrap",
        }}
      >
        {output}
      </Typography>
    </Box>
  );
};

const EditorHeader = ({
  onRun,
  onReset,
}: {
  onRun: () => void;
  onReset: () => void;
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 2,
    }}
  >
    <Typography
      variant="h6"
      sx={{
        color: "#ffffff",
        fontFamily: "monospace",
        fontWeight: "bold",
      }}
    >
      Editor de Código TypeScript
    </Typography>
    <Box sx={{ display: "flex", gap: 1 }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<PlayArrow />}
        onClick={onRun}
        sx={{
          backgroundColor: "rgba(34, 197, 94, 0.8)",
          "&:hover": {
            backgroundColor: "rgba(34, 197, 94, 1)",
          },
        }}
      >
        Ejecutar
      </Button>
      <Button
        variant="outlined"
        startIcon={<Refresh />}
        onClick={onReset}
        sx={{
          color: "#ffffff",
          borderColor: "rgba(255, 255, 255, 0.3)",
          "&:hover": {
            borderColor: "rgba(255, 255, 255, 0.5)",
          },
        }}
      >
        Resetear
      </Button>
    </Box>
  </Box>
);

const CodeEditorUI = ({
  code,
  output,
  errors,
  onCodeChange,
  onMount,
  onRun,
  onReset,
}: {
  code: string;
  output: string;
  errors: string[];
  onCodeChange: (value: string | undefined) => void;
  onMount: (editor: editor.IStandaloneCodeEditor) => void;
  onRun: () => void;
  onReset: () => void;
}) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          backgroundColor: "rgba(30, 30, 30, 0.95)",
          borderRadius: "8px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <EditorHeader onRun={onRun} onReset={onReset} />

        <Box
          sx={{
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "4px",
            overflow: "hidden",
            mb: 2,
          }}
        >
          <Editor
            height="400px"
            defaultLanguage="typescript"
            value={code}
            onChange={onCodeChange}
            onMount={onMount}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true,
              tabSize: 2,
            }}
          />
        </Box>

        <ErrorDisplay errors={errors} />
        <OutputDisplay output={output} />
      </Paper>
    </Box>
  );
};
