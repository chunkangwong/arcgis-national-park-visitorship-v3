<script lang="ts">
  import type {
    CalciteSegmentedControlCustomEvent,
    CalciteSelectCustomEvent,
    CalciteSliderCustomEvent,
  } from "@esri/calcite-components";

  export let isDefault: boolean;
  export let count: number;
  export let orderBy: string;
  export let year: string;
  export let handleCountChange: (
    event: CalciteSliderCustomEvent<HTMLCalciteSliderElement>
  ) => void;
  export let handleOrderByChange: (
    event: CalciteSegmentedControlCustomEvent<HTMLCalciteSegmentedControlElement>
  ) => void;
  export let handleYearChange: (
    event: CalciteSelectCustomEvent<HTMLCalciteSelectElement>
  ) => void;
  export let handleReset: () => void;
</script>

<calcite-block heading="Filters" open>
  <div slot="control">
    <calcite-action
      disabled={isDefault}
      icon="reset"
      role="button"
      tabindex="0"
      id="control-reset-el"
      indicator={!isDefault}
      on:click={handleReset}
      on:keypress={handleReset}
    />
    <calcite-tooltip reference-element="control-reset-el" placement="bottom">
      Reset to defaults
    </calcite-tooltip>
  </div>
  <calcite-label>
    Data type, per state
    <calcite-segmented-control
      width="full"
      value={orderBy}
      on:calciteSegmentedControlChange={handleOrderByChange}
    >
      <calcite-segmented-control-item value="DESC" checked
        >Most visited</calcite-segmented-control-item
      >
      <calcite-segmented-control-item value="ASC"
        >Least visited</calcite-segmented-control-item
      >
    </calcite-segmented-control>
  </calcite-label>
  <calcite-label>
    Year data to display
    <calcite-select value={year} on:calciteSelectChange={handleYearChange}>
      <calcite-option label="2022" value="F2022" />
      <calcite-option label="2021" value="F2021" />
      <calcite-option label="2020" value="F2020" />
      <calcite-option label="2019" value="F2019" />
    </calcite-select>
  </calcite-label>
  <calcite-label>
    Max parks per state
    <calcite-slider
      label-ticks
      ticks="1"
      min="1"
      max="5"
      value={count}
      on:calciteSliderChange={handleCountChange}
    />
  </calcite-label>
</calcite-block>
