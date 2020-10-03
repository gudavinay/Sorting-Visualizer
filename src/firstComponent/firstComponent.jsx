/* eslint-disable no-loop-func */
import React, { Component } from "react";
import BarComponent from "./Bar/Bar";
import  './firstComponent.css'

let BAR_COUNT = 100;
let MAX_HEIGHT = 500;
let SORTING_SPEED = 500;
let steps = 0; // for merge sort as it's recursively written

export default class FirstComponent extends Component {
  constructor() {
    super();
    this.state = {
      array: [],
      sorted: false
    };
  }


  submitForm() {
    MAX_HEIGHT = document.getElementById("heightTextBox").value
      ? document.getElementById("heightTextBox").value
      : 500;
    BAR_COUNT = document.getElementById("numberOfBars").value
      ? document.getElementById("numberOfBars").value
      : 100;
    SORTING_SPEED = document.getElementById("sortingSpeed").value
      ? document.getElementById("sortingSpeed").value
      : 25;
      let array = [];
    steps = 0;
    for (let i = 0; i < BAR_COUNT; i++) {
      array.push({
        number: Math.round(Math.random() * 1000) % MAX_HEIGHT,
        visited: false,
      });
    }
    this.setState({ array: array, sorted: false });
  }

  // BUBBLE SORT BEGIN

  visualizeBubbleSort() {
    console.log("Bubble Sort");
    let array = this.state.array;
    array.forEach((element) => {
      element.visited = false; // if already sorted and clicked the sort function again... we just need to reset the visited flags
    });
    if (array) {
      for (let i = 0; i < BAR_COUNT - 1; i++) {
        for (let j = 0; j < BAR_COUNT - i - 1; j++) {
          setTimeout(() => {
            if (array[j].number > array[j + 1].number) {
              let temp = array[j].number;
              array[j].number = array[j + 1].number;
              array[j + 1].number = temp;
            }
            if (j === BAR_COUNT - i - 2) {
              array[j + 1].visited = true;
            }
            this.setState({
              array: array,
              sorted: i === BAR_COUNT - 2 && j === BAR_COUNT - i - 2,
            });
          }, SORTING_SPEED * i);
        }
      }
    }
  }

  // BUBBLE SORT END

  // MERGE SORT BEGIN

  visualizeMergeSort() {
    console.log("Merge Sort");
    const array = this.state.array;
    array.forEach((element) => {
      element.visited = false; // if already sorted and clicked the sort function again... we just need to reset the visited flags
    });
    var start = performance.now();
    this.mergeSort(array, 0, array.length - 1);
    console.log(performance.now() - start);
  }

  mergeSort(array, low, high) {
    if (low < high) {
      let mid = parseInt(low + (high - low) / 2);
      this.mergeSort(array, low, mid);
      this.mergeSort(array, mid + 1, high);
      this.merge(array, low, mid, high);
    }
    if (low === 0 && high === BAR_COUNT - 1) {
      setTimeout(() => {
        this.setState({ array: array, sorted: true });
      }, BAR_COUNT * SORTING_SPEED);
    }
  }

  merge(array, low, mid, high) {
    setTimeout(() => {
      let sizeOfFirst = mid - low + 1;
      let sizeOfSecond = high - mid;
      let firstSlice = [],
        secondSlice = [];
      for (let i = 0; i < sizeOfFirst; i++) {
        firstSlice[i] = array[low + i];
      }
      for (let i = 0; i < sizeOfSecond; i++) {
        secondSlice[i] = array[mid + i + 1];
      }
      let i = 0;
      let j = 0;
      let k = low;
      while (i < sizeOfFirst && j < sizeOfSecond) {
        if (firstSlice[i].number < secondSlice[j].number) {
          array[k++] = firstSlice[i++];
        } else {
          array[k++] = secondSlice[j++];
        }
      }
      while (i < sizeOfFirst) {
        array[k++] = firstSlice[i++];
      }
      while (j < sizeOfSecond) {
        array[k++] = secondSlice[j++];
      }
      for (let i = low; i <= high; i++) {
        array[i].visited = true;
      }
      this.setState({ array: array, sorted: false });
    }, SORTING_SPEED * steps++);
  }

  // MERGE SORT ENG

  // SELECTION SORT BEGIN

  visualizeSelectionSort() {
    console.log("Selection Sort");
    const array = this.state.array;
    array.forEach((element) => {
      element.visited = false; // if already sorted and clicked the sort function again... we just need to reset the visited flags
    });

    for (let i = 0; i < BAR_COUNT - 1; i++) {
      let minPos = i;
      for (let j = i + 1; j < BAR_COUNT; j++) {
        setTimeout(() => {
          if (array[minPos].number > array[j].number) {
            minPos = j;
          }
          let key = array[minPos];
          while (minPos > i) {
            array[minPos] = array[minPos - 1];
            minPos--;
          }
          array[i] = key;
          array[i].visited = true;
          this.setState({array:array,sorted:i === BAR_COUNT - 2 && j === BAR_COUNT - 1});
        }, i * SORTING_SPEED);
      }
    }
  }

  // SELECTION SORT END

  render() {
    return (
      <>
      <div style={{margin:'30px'}}>
        <div>
          <label className="touchmenot">Max Height</label>
          <input
            type="number"
            placeholder="defaulted to 500"
            id="heightTextBox"
          ></input>
        </div>
        <div>
          <label className="touchmenot">Number of Bars</label>
          <input
            type="number"
            placeholder="defaulted to 100"
            id="numberOfBars"
          ></input>
        </div>
        <div>
          <label className="touchmenot">Sorting Speed</label>
          <input
            type="number"
            placeholder="defaulted to 25"
            id="sortingSpeed"
          ></input>
        </div>
        <button onClick={() => this.submitForm()}>Generate random array of numbers</button>
        <div>
          <BarComponent state={this.state}></BarComponent>
        </div>

        <div>
          <button className="touchmenot" onClick={() => this.visualizeBubbleSort()}>
            Visualize Bubble Sort
          </button>
          <button className="touchmenot" onClick={() => this.visualizeMergeSort()}>
            Visualize Merge Sort
          </button>
          <button className="touchmenot" onClick={() => this.visualizeSelectionSort()}>
            Visualize Selection Sort
          </button>
          <button className="touchmenot" onClick={() => this.visualizeBubbleSort()}>
            Visualize Quick Sort
          </button>
          <button className="touchmenot" onClick={() => this.visualizeBubbleSort()}>
            Visualize Insertion Sort
          </button>
        </div></div>
      </>
    );
  }
}
