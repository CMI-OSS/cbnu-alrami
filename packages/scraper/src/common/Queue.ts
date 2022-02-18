interface QueueNode<T> {
  next: QueueNode<T> | null;
  data: T;
}

export default class Queue<T> {
  head: QueueNode<T> | null = null;

  tail: QueueNode<T> | null = null;

  length = 0;

  reset() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  front() {
    if (this.isEmpty() || this.head === null) {
      return null;
    }

    return this.head.data;
  }

  isEmpty() {
    return this.length === 0;
  }

  pushFront(data: T) {
    const next = this.head;
    this.head = {
      data,
      next,
    };
    this.length += 1;
  }

  push(data: T) {
    if (this.head === null || this.tail === null) {
      this.head = {
        data,
        next: null,
      };
      this.tail = this.head;
      this.length += 1;
      return;
    }

    this.tail.next = {
      data,
      next: null,
    };

    this.tail = this.tail.next;

    this.length += 1;
  }

  pop() {
    if (this.isEmpty() || this.head === null) {
      return null;
    }
    const node = this.head;
    this.head = this.head.next;
    this.length -= 1;

    return node.data;
  }
}
