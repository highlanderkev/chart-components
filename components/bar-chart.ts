import {
  LitElement,
  html,
  css,
  property,
  customElement
} from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import { exampleData, ChartDataElement } from '../data';
import { calculateRandomColor } from '../utils/colors';

@customElement('bar-chart')
export class BarChart extends LitElement {
  @property({ type: String })
  title: string = 'BarChart.title';

  @property({ type: Array })
  data: ChartDataElement[] = [];

  static get styles() {
    return css`
      .chart {
        display: flex;
        flex-direction: column;
        position: relative;
        background-color: white;
        width: 100%;
        height: 100%;
      }

      .header {
        display: flex;
        flex-direction: row;
      }

      .title {
        display: block;
        width: 100%;
        font-weight: 700;
        font-size: 1.25rem;
        text-align: center;
      }

      .footer {
        display: flex;
      }

      .body {
        display: flex;
        flex-direction: column;
        position: relative;
      }

      .row {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
      }

      .text {
        grid-column-start: 1;
        grid-column-end: 2;
        display: block;
        text-align: center;
        font-weight: 600;
        font-size: 1.2rem;
        flex-shrink: 2;
      }

      .bar {
        grid-column-start: 3;
        grid-column-end: 11;
        width: 100%;
        background: repeating-linear-gradient(to right,#ddd,#ddd 1px,#fff 1px,#fff 5%);
      }

      .value {
        display: block;
        height: 100%;
        background-color: red;
        text-align: end;
        font-weight: 600;
      }
    `;
  }

  private renderChartElement(d: ChartDataElement, color: string) {
    return html`
      <div id="${d.id}" class="row">
        <span class="text">
          ${d.text}
        </span>
        <div class="bar">
          <div class="value" .value="${d.value}" style=${styleMap(
            {
              width: `${d.value}%`,
              backgroundColor: `var(--element-${d.id}-color, ${color})` 
            })}>
            ${d.value}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="chart">
        <div class="header">
          <span class="title">${this.title}</span>
        </div>
        <div class="body">
          ${this.data.map((d: ChartDataElement, index: number) => this.renderChartElement(d, calculateRandomColor(index)))}
        </div>
        <div class="footer">
          Key: 
        </div>
      </div>
    `;
  }
}