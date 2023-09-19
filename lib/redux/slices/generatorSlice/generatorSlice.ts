/* Core */
import { createSlice } from '@reduxjs/toolkit'

/* Instruments */
import {array} from "zod";

const initialState: GeneratorState = {
  value: [],
  status: 'stopped',
}

const randomNumber = () => {
  return (Math.random() * 100).toFixed(2);
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export const generatorSlice = createSlice({
  name: 'generator',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    generate: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      if(state.value.length === 10) {
        state.value.pop();
        state.value.unshift({timestamp: formatTimestamp(timestamp), value: randomNumber()})
      } else {
        state.value.unshift({timestamp: formatTimestamp(timestamp), value: randomNumber()})
      }
    },
    switchGenerator: (state) => {
        if(state.status === 'stopped') {
            state.status = 'generating'
        } else {
            state.status = 'stopped'
        }
    },
  },

})

/* Types */
export interface GeneratorState {
  value: array<object>
  status: 'generating' | 'stopped'
}
