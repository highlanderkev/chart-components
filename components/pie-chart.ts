import {
  LitElement,
  html,
  css,
  property,
  customElement,
  svg,
} from 'lit-element';
import { exampleData, ChartDataElement } from '../data';
import { calculateRandomColor } from '../utils/colors';

@customElement('pie-chart')
export class PieChart extends LitElement {
  @property({ type: Boolean })
  isDonut = false;

  @property({ type: Array })
  data: ChartDataElement[] = [];

  get totalValue(){
    const t: number = this.data.reduce((acc, d: ChartDataElement) => acc + d.value, 0);
    return t;
  }

  calculateStrokeValue(index: number) {
    return Math.round(this.data[index].value / this.totalValue * 100);
  }

  calculateStrokeOffsetValue(index: number) {
    let offset = 0;
    if(index > 0) {
      while(index > 0){
        index -= 1;
        offset += this.calculateStrokeValue(index);
      }
    }
    return offset;
  }

  static get styles() {
    return css`
      .chart {
        width: 100px;
        height: 100px;
        background-color: transparent;
        border-radius: 50%;
        transform: rotate(-90deg);
      }

      circle {
        fill: transparent;
        animation: fillup 5s linear infinite;
      }

      @keyframes fillup {
        to { stroke-dasharry: 158 158; }
      }
    `;
  }

  private renderChartElement(id: any, color: string, strokeValue: number, offsetValue: number, isDonut: boolean) {
    const strokeWidth = isDonut ? '11.25' : '32';
    return svg`
      <circle id="element-${id}" r="16" cx="16" cy="16" stroke="var(--element-${id}-color, ${color})" stroke-dasharray="${strokeValue} 100" stroke-width="${strokeWidth}" stroke-dashoffset="-${offsetValue}">
    `;
  }

  render() {
    return html`
      <svg class="chart" viewbox="0 0 32 32">
        ${this.data.map((elem: ChartDataElement, index: number) => this.renderChartElement(elem.id, calculateRandomColor(index), this.calculateStrokeValue(index), this.calculateStrokeOffsetValue(index), this.isDonut))}
      </svg>
    `;
  }
}