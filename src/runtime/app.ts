import { LitenComponent } from "../types/liten";
import { mountComponent } from "./render";

export function createApp(component: LitenComponent, target: HTMLElement | null) {
    if (target == null) throw new Error("[Fatal] Not valid element to attach!");

    mountComponent(component, target)
}
