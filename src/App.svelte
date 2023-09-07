<script lang="ts">
  import Map from "@arcgis/core/Map";
  import MapView from "@arcgis/core/views/MapView";
  import { onMount } from "svelte";

  let viewDiv: HTMLDivElement;

  onMount(() => {
    const map = new Map({
      basemap: "topo-vector",
    });
    const mapView = new MapView({
      container: viewDiv,
      map: map,
      center: [-118.805, 34.027],
      zoom: 13,
    });
  });
</script>

<main>
  <div bind:this={viewDiv} />
</main>

<style>
  main,
  div {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
</style>
