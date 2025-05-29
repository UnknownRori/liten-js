import { createApp } from '../src';
import HelloWorld from './components/HelloWorld.lt';
import Counter from './components/Counter.lt';

createApp(Counter, document.querySelector("#app"));
