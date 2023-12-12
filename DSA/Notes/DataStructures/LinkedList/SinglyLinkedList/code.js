class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(val) {
        let newNode = new Node(val)
        if (!this.head) {
            this.head = newNode
            this.tail = newNode
        }
        else {
            this.tail.next = newNode
            this.tail = newNode
        }
        this.length += 1
        return newNode
    }

    pop() {
        if (!this.head) return;
        let current = this.head;
        let previous = current;
        while (current.next) {
            previous = current
            current = current.next;
        }
        previous.next = null;
        this.tail = previous
        this.length--
        if (!this.length) {
            this.head = null;
            this.tail = null;
        }
        return current
    }

    print() {
        let array = [];
        let current = this.head
        while (current) {
            array.push(current.val)
            current = current.next
        }
        console.log(array.join(" -> "))
    }

    shift() {
        if (!this.head) return;
        let current = this.head;
        this.head = current.next;
        this.length--;
        if (!this.length)
            this.tail = null
        return current
    }

    unshift(val) {
        let newNode = new Node(val);
        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        }
        else {
            newNode.next = this.head;
            this.head = newNode
        }
        this.length += 1
        return this
    }

    get(index) {
        if (index < 0 || index >= this.length) return null;
        let currentNode = this.head;
        let counter = 0;
        while (counter !== index) {
            currentNode = currentNode.next;
            counter++
        }
        return currentNode
    }

    set(index, value) {
        let currentNode = this.get(index);
        if (currentNode) {
            currentNode.val = value;
            return true;
        }
        return false;
    }

    insert(index, val) {
        if (index < 0 || index > this.length) return false
        if (index === 0) return !!this.unshift(val)
        if (index === this.length) return !!this.push(val)
        let newNode = new Node(val)
        let previousNode = this.get(index - 1);
        newNode.next = previousNode.next;
        previousNode.next = newNode
        this.length += 1
        return true
    }

    remove(index) {
        if (index < 0 || index > this.length) return undefined;
        if (index === 0) return this.shift(index);
        if (index === this.length) return this.pop();
        let previousNode = this.get(index - 1)
        let removedNode = previousNode.next
        previousNode.next = removedNode.next;
        this.length -= 1;
        return removedNode;
    }

    reverse() {
        let temp = this.head;
        this.head = this.tail;
        this.tail = temp;
        let next;
        let prev = null;
        for (let i = 0; i < this.length; i++) {
            next = temp.next;
            temp.next = prev;
            prev = temp;
            temp = next;
        }
    }
}

var list = new SinglyLinkedList()
list.push("hi")
list.push("hello")
list.push("hey")
// console.log(list)
// list.shift()
// console.log(list)
// list.shift()
// console.log(list)
// list.shift()
// console.log(list)
// console.log(list.unshift("welcome"))
// console.log(list.get(0))

console.log(list.insert(0, "welcome"))
console.log(list.insert(4, "vanakkam"))
console.log(list.insert(1, "I'm Back"))
console.log(list.insert(10, "I'm Back"))
list.print()
list.reverse()
list.print()