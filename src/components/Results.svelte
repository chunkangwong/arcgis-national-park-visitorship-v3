<script lang="ts">
  import { view } from "../arcgis";

  export let graphics: __esri.Graphic[];
  export let year: string;
  export let loading: boolean;

  const handleResultClick = (graphic: __esri.Graphic, index: number) => () => {
    const popup = graphics && graphics[index];
    if (popup) {
      const geometry = popup.geometry as __esri.Point;
      view.popup.open({
        features: [popup],
        location: graphic.geometry,
      });
      view.goTo(
        {
          center: [geometry.longitude, geometry.latitude],
          zoom: 4,
        },
        { duration: 400 }
      );
    }
  };
</script>

<calcite-block
  collapsible
  heading={`Results (${graphics.length})`}
  open={graphics.length > 0}
  {loading}
>
  <calcite-list>
    {#each graphics as graphic, index}
      <calcite-list-item
        label={graphic.attributes.Park}
        value={index}
        description={`${graphic.attributes[year].toLocaleString()} visitors`}
        on:click={handleResultClick(graphic, index)}
        on:keypress={handleResultClick(graphic, index)}
        role="button"
        tabindex="0"
      >
        <calcite-chip
          scale="s"
          slot="content-end"
          value={graphic.attributes.State}
        >
          {graphic.attributes.State}
        </calcite-chip>
      </calcite-list-item>
    {/each}
  </calcite-list>
</calcite-block>
