<template>
<hot-table :data=data :rowHeaders="true" :colHeaders="true"></hot-table>
<hot-table :settings="hotSettings"></hot-table>
</template>
<script>
import { HotTable} from '@handsontable/vue';
import Handsontable from 'handsontable/base';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.css';
registerAllModules();

export default {
  name: "DCC Table",
  
  components: {
    HotTable
  },
  data: () => ({
    data: [
          ["", "Ford", "Volvo", "Toyota", "Honda"],
          ["2016", 10, 11, 12, 13],
          ["2017", 20, 11, 14, 13],
          ["2018", 30, 15, 12, 13]
        ],
    hotSettings: {
      data: Handsontable.helper.createSpreadsheetData(6, 10),
      //data: dsVariaveis,
      colHeaders: true,
      height: 'auto',
      licenseKey: 'non-commercial-and-evaluation'
    },
  }),
  methods: {

  },
  mounted() {
  },
};
</script>
<!-- <style src="../node_modules/handsontable/dist/handsontable.full.css"></style> -->
