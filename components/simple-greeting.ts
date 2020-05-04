import {
  LitElement,
  html,
  css,
  property,
  customElement
} from 'lit-element';

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
  @property() name = 'World';

  static get styles() {
    return css`
      p {
        color: red;
      }
    `;
  }

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}