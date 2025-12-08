import type { Step } from '../types';

export class Queue<T> {
  private items: T[] = [];
  private steps: Step[] = [];
  private stepId = 0;

  enqueue(item: T): void {
    this.items.push(item);
    this.steps.push({
      id: this.stepId++,
      description: `Enqueue ${item} to the queue`,
      data: [...this.items],
      highlights: [this.items.length - 1]
    });
  }

  dequeue(): T | undefined {
    const item = this.items.shift();
    this.steps.push({
      id: this.stepId++,
      description: item !== undefined ? `Dequeue ${item} from the queue` : 'Dequeue from empty queue',
      data: [...this.items],
      highlights: []
    });
    return item;
  }

  front(): T | undefined {
    return this.items[0];
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
      description: 'Clear the queue',
      data: [],
      highlights: []
    });
  }

  getItems(): T[] {
    return [...this.items];
  }

  getSteps(): Step[] {
    return this.steps;
  }

  resetSteps(): void {
    this.steps = [];
    this.stepId = 0;
  }
}
