import * as tf from '@tensorflow/tfjs';
import { Injectable, OnInit } from '@angular/core';
import { load } from '@tensorflow-models/universal-sentence-encoder';

@Injectable({
  providedIn: 'root'
})
export class EncodingService implements OnInit{

  private modelPromise: Promise<any>; // Cache model promise to avoid reloading model multiple times

  constructor() {
    this.modelPromise = load();

    // To set WebGL backend
    tf.setBackend('webgl').then(() => {
      console.log('WebGL backend set!');
    }).catch(e => {
      console.error('Failed to set WebGL backend', e);
    });

// Alternatively, to set the CPU backend
//     tf.setBackend('cpu').then(() => {
//       console.log('CPU backend set!');
//     }).catch(e => {
//       console.error('Failed to set CPU backend', e);
//     });
  }

  ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    // loadModel(): void {
    //   await tf.loadModel
    // }

  async encodeText(text: string): Promise<Float32Array> {
    const model = await this.modelPromise; // Ensure model is loaded once
    const embeddings = await model.embed([text]);
    console.info(`query embedding: ${embeddings}`);
    return embeddings.dataSync(); // Convert tensor to Float32Array
  }
}
