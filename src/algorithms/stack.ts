import type { Step } from '../types';

export class Stack<T extends number | string> {
  private items: T[] = [];
  private steps: Step<T>[] = [];
  private stepId = 0;

  push(item: T): void {
    this.items.push(item);
    this.steps.push({
      id: this.stepId++,
      description: `Push ${item} onto the stack`,
      data: [...this.items],
      highlights: [this.items.length - 1]
    });
  }

  pop(): T | undefined {
    const item = this.items.pop();
    this.steps.push({
      id: this.stepId++,
      description: item !== undefined ? `Pop ${item} from the stack` : 'Pop from empty stack',
      data: [...this.items],
      highlights: []
    });
    return item;
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
    this.steps.push({
      id: this.stepId++,
      description: 'Clear the stack',
      data: [],
      highlights: []
    });
  }

  getItems(): T[] {
    return [...this.items];
  }

  getSteps(): Step<T>[] {
    return this.steps;
  }

  resetSteps(): void {
    this.steps = [];
    this.stepId = 0;
  }
}
