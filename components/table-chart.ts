import {
  LitElement,
  html,
  css,
  property,
  customElement,
} from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import { exampleData, ChartDataElement } from '../data';
import { calculateRandomColor } from '../utils/colors';

@customElement('table-chart')
export class TableChart extends LitElement {


  @property({ type: Array })
  data: ChartDataElement[] = exampleData;

  static get styles() {
    return css`
      table, td {
        border: 1px solid #333;
      }

      thead, tfoot {
        background-color: #333;
        color: #fff;
      }
    `;
  }

  private get keys(){
    return Object.keys(this.data[0]);
  }

  private renderChartHeader(){
    return html`
      <thead>
        <tr>
          ${this.keys.map((key, index) => html`<td>${key}</td>`)}
        </tr>
      </thead>
    `;
  }

  private renderChartElement(d: ChartDataElement, color: string) {
    return html`
      <tr style=${styleMap(
            {
              backgroundColor: `var(--element-${d.id}-color, ${color})`
            }
          )}>
        <td>${d.id}</td>
        <td>${d.text}</td>
        <td>${d.value}</td>
      </tr>
    `;
  }

  render() {
    return html`
      <table>
        ${this.renderChartHeader()}
        <tbody>
          ${this.data.map((d: ChartDataElement, index: number) => this.renderChartElement(d, calculateRandomColor(index)))}
        </tbody>
      </table>
    `;
  }
}