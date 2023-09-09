import Map from "@arcgis/core/Map";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapView from "@arcgis/core/views/MapView";
import Home from "@arcgis/core/widgets/Home";

const popupTemplate = {
  title: "{Park}",
  content: [
    {
      type: "fields",
      fieldInfos: [
        {
          fieldName: "F2022",
          label: "2022",
          format: { digitSeparator: true },
        },
        {
          fieldName: "F2021",
          label: "2021",
          format: { digitSeparator: true },
        },
        {
          fieldName: "F2020",
          label: "2020",
          format: { digitSeparator: true },
        },
        {
          fieldName: "F2019",
          label: "2019",
          format: { digitSeparator: true },
        },
      ],
    },
  ],
};

export const layer = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/US_National_Parks_Annual_Visitation/FeatureServer/0",
  outFields: ["*"],
  popupTemplate: popupTemplate,
});

const map = new Map({
  basemap: "streets-navigation-vector",
  layers: [layer],
});
export const view = new MapView({
  map: map,
  center: [-120, 45],
  zoom: 3,
});

const homeWidget = new Home({
  view: view,
});

view.ui.add(homeWidget, "top-right");
view.ui.move("zoom", "top-right");
