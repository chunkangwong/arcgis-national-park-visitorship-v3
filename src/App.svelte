<script lang="ts">
  import { view, layer } from "./arcgis";
  import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
  import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
  import TopFeaturesQuery from "@arcgis/core/rest/support/TopFeaturesQuery";
  import TopFilter from "@arcgis/core/rest/support/TopFilter";
  import WebStyleSymbol from "@arcgis/core/symbols/WebStyleSymbol";
  import type {
    CalciteSegmentedControlCustomEvent,
    CalciteSelectCustomEvent,
    CalciteSliderCustomEvent,
  } from "@esri/calcite-components";
  import { onMount } from "svelte";
  import Filter from "./components/Filter.svelte";
  import Results from "./components/Results.svelte";

  const countDefault = 1;
  const orderByDefault = "DESC";
  const yearDefault = "F2022";

  let layerView: __esri.FeatureLayerView;
  let loading: boolean = true;
  let count = countDefault;
  let orderBy = orderByDefault;
  let year = yearDefault;
  let viewDiv: HTMLDivElement;
  let graphics: __esri.Graphic[] = [];

  const filterItems = async () => {
    if (!layer || !layerView) {
      return;
    }
    loading = true;
    const query = new TopFeaturesQuery({
      topFilter: new TopFilter({
        topCount: count,
        groupByFields: ["State"],
        orderByFields: [`${year} ${orderBy}`],
      }),
      orderByFields: [`${year} ${orderBy}`],
      outFields: ["State, F2022, F2021, F2020, F2019, Park"],
      returnGeometry: true,
      cacheHint: false,
    });

    const results = await layer.queryTopFeatures(query);

    query.orderByFields = [""];
    const objectIds = await layer.queryTopObjectIds(query);
    layerView.filter = new FeatureFilter({
      objectIds,
    });

    graphics = results.features;
    loading = false;
  };

  const setRenderer = async () => {
    const symbol = new WebStyleSymbol({
      name: "park",
      styleName: "Esri2DPointSymbolsStyle",
    });

    const cimSymbol = await symbol.fetchCIMSymbol();
    const symbolLayers = cimSymbol.data.symbol
      .symbolLayers as __esri.CIMVectorMarker[];
    symbolLayers[0].size = 24;
    symbolLayers[1].size = 0;

    return new SimpleRenderer({
      symbol: cimSymbol,
    });
  };

  onMount(async () => {
    view.container = viewDiv;
    layer.renderer = await setRenderer();
    layerView = await view.whenLayerView(layer);
    filterItems();
  });

  const handleOrderByChange = (
    e: CalciteSegmentedControlCustomEvent<HTMLCalciteSegmentedControlElement>
  ) => {
    orderBy = e.target.value;
    filterItems();
  };

  const handleYearChange = (
    e: CalciteSelectCustomEvent<HTMLCalciteSelectElement>
  ) => {
    year = e.target.value;
    filterItems();
  };

  const handleCountChange = (
    e: CalciteSliderCustomEvent<HTMLCalciteSliderElement>
  ) => {
    count = Number(e.target.value);
    filterItems();
  };

  const handleReset = () => {
    count = countDefault;
    orderBy = orderByDefault;
    year = yearDefault;
    filterItems();
  };
</script>

<main>
  <calcite-shell>
    <calcite-shell-panel slot="panel-start">
      <calcite-panel heading="National Park Visitation">
        <Filter
          isDefault={count === countDefault &&
            orderBy === orderByDefault &&
            year === yearDefault}
          {count}
          {orderBy}
          {year}
          {handleCountChange}
          {handleOrderByChange}
          {handleYearChange}
          {handleReset}
        />
        <Results {year} {graphics} {loading} />
      </calcite-panel>
    </calcite-shell-panel>
    <div id="viewDiv" bind:this={viewDiv} />
  </calcite-shell>
</main>

<style>
  main {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  #viewDiv {
    height: 100%;
  }
</style>
