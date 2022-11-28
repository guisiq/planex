<template>
  <v-stepper v-model="tela">
    <v-stepper-header>
      <v-stepper-step :complete="tela > 1" step="1"> Variaveis </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="tela > 2" step="2"> Respostas </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="tela > 3" step="3"> resultados </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="tela > 4" step="4"> Teste T </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="tela > 5" step="5"> Tabela de Anova </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <!-- variaveis -->
      <v-stepper-content step="1">

        <v-card class="mb-12">
          <v-row>
            <v-col>
              <label for="nVariaveisInput">Escolha a quantidade de variaveis (K) :</label>
              <v-text-field id="nVariaveisInput" type="number" step="any" min="0" ref="input" :rules="[numberRule]"
                v-model.number="Nvariaveis"></v-text-field>
            </v-col>
            <v-col>
              <label for="nVariaveisInput">Escolha a quantidade de replicatas do ponto central (rpc) :</label>
              <v-text-field id="nReplicadasInput" type="number" step="any" min="0" ref="input" :rules="[numberRule]"
                v-model.number="NReplicadas"></v-text-field>
            </v-col>
          </v-row>

          <!-- tabela -->
          <v-data-table :headers="headersVariaveis" :items="dsVariaveis" disable-pagination :hide-default-footer="true">
            <!-- :footer-props="{
                  disablePagination:false

                }" -->
            <template v-slot:[`item.index`]="props">
              X<sub>{{ props.item.index }}</sub>
            </template>
            <template v-slot:[`item.name`]="props">
              <v-edit-dialog :return-value.sync="props.item.nome" large persistent @save="save" @cancel="cancel"
                @open="open" @close="close">
                <div>{{ props.item.nome }}</div>
                <template v-slot:input>
                  <div class="mt-4 text-h6">atualizar nome</div>
                  <v-text-field v-model="props.item.nome" :rules="[max25chars]" label="Edit" single-line counter
                    autofocus></v-text-field>
                </template>
              </v-edit-dialog>
            </template>
            <template v-slot:[`item.unidade`]="props">
              <v-edit-dialog :return-value.sync="props.item.unidade" large persistent @save="save" @cancel="cancel"
                @open="open" @close="close">
                <div>{{ props.item.unidade }}</div>
                <template v-slot:input>
                  <div class="mt-4 text-h6">atualizar unidade</div>
                  <v-text-field v-model="props.item.unidade" :rules="[max25chars]" label="Edit" single-line counter
                    autofocus></v-text-field>
                </template>
              </v-edit-dialog>
            </template>
            <template v-slot:[`item.vBaixo`]="props">
              <v-edit-dialog :return-value.sync="props.item.vBaixo" large persistent @save="save" @cancel="cancel"
                @open="open" @close="close">
                <div>{{ props.item.vBaixo }}</div>
                <template v-slot:input>
                  <div class="mt-4 text-h6">Atualizar nivel menor</div>
                  <v-text-field v-model="props.item.vBaixo" :rules="[max25chars]" label="Edit" single-line counter
                    autofocus></v-text-field>
                </template>
              </v-edit-dialog>
            </template>
            <template v-slot:[`item.vAlto`]="props">
              <v-edit-dialog :return-value.sync="props.item.vAlto" large persistent @save="save" @cancel="cancel"
                @open="open" @close="close">
                <div>{{ props.item.vAlto }}</div>
                <template v-slot:input>
                  <div class="mt-4 text-h6">Atualizar nivel maior</div>
                  <v-text-field v-model="props.item.vAlto" :rules="[max25chars]" label="Edit" single-line counter
                    autofocus></v-text-field>
                </template>
              </v-edit-dialog>
            </template>
          </v-data-table>

          <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}

            <template v-slot:action="{ attrs }">
              <v-btn v-bind="attrs" text @click="snack = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-card>

        <v-btn text> Cancelar </v-btn>

        <v-btn @click="voltar"> Voltar </v-btn>
        <v-btn color="primary" @click="avancar"> Continuar </v-btn>
      </v-stepper-content>
      
      <v-stepper-content step="2">
        <v-card class="mb-12">
          <v-row>
            <v-col>
              <label for="nRespostasInput">Escolha a quantidade de Respostas (y) :</label>
              <v-text-field id="nRespostasInput" type="number" step="any" min="0" ref="input" :rules="[numberRule]"
                v-model.number="NRespostas"></v-text-field>
            </v-col>
          </v-row>

          <!-- tabela -->
          <v-data-table :headers="headersResposta" :items="dsResposta" disable-pagination :hide-default-footer="true">
            <!-- :footer-props="{
                  disablePagination:false

                }" -->
            <template v-slot:[`item.index`]="props">
              Y<sub>{{ props.item.index }}</sub>
            </template>
            <template v-slot:[`item.nome`]="props">
              <v-edit-dialog :return-value="props.item.nome" large persistent @save="save" @cancel="cancel" @open="open"
                @close="close">
                <div>{{ props.item.nome }}</div>
                <template v-slot:input>
                  <div class="mt-4 text-h6">atualizar nome</div>
                  <v-text-field v-model="props.item.nome" :rules="[max25chars]" label="Edit" single-line counter
                    autofocus></v-text-field>
                </template>
              </v-edit-dialog>
            </template>
            <template v-slot:[`item.unidade`]="props">
              <v-edit-dialog :return-value="props.item.unidade" large persistent @save="save" @cancel="cancel"
                @open="open" @close="close">
                <div>{{ props.item.unidade }}</div>
                <template v-slot:input>
                  <div class="mt-4 text-h6">atualizar unidade</div>
                  <v-text-field v-model="props.item.unidade" :rules="[max25chars]" label="Edit" single-line counter
                    autofocus></v-text-field>
                </template>
              </v-edit-dialog>
            </template>

          </v-data-table>
          <!-- <v-select
            v-model="select"
            :items="dsResposta"
            item-text="name"
            persistent-hint
            return-object
            single-line
            v-on:change="mudarVariavel()"
          >
            <template slot="selection">
              Y<sub> {{select.index}}</sub> - {{select.nome}}
            </template>
            <template v-slot:item="{item}">
              Y<sub> {{item.index}}</sub> - {{item.nome}}
            </template>
            <template v-slot:option="item">
              Y<sub> {{item.index}}</sub> - {{item.nome}}
            </template>
          </v-select> -->

          <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}

            <template v-slot:action="{ attrs }">
              <v-btn v-bind="attrs" text @click="snack = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-card>

        <v-btn text> Cancelar </v-btn>

        <v-btn @click="voltar"> Voltar </v-btn>
        <v-btn color="primary" @click="avancar"> Continuar </v-btn>
      </v-stepper-content>
      <!-- resultados  -->
      <v-stepper-content step="3">
        <v-card class="mb-12">
          <v-data-table :headers="headersMatrizX" :items="dsMatrix" disable-pagination :hide-default-footer="true">

            <template v-for="resposta in dsResposta" v-slot:[resposta.attributeName3]="props">
              <v-edit-dialog :key="resposta.index" :return-value.sync="props.item[resposta.attributeName]" large
                persistent @save="save" @cancel="cancel" @open="open" @close="close">
                <div>{{ props.item[resposta.attributeName] }}</div>
                <template v-slot:input>
                  <div class="mt-4 text-h6">atualizar resposta</div>
                  <v-text-field v-model.number="props.item[resposta.attributeName]" label="Edit" single-line counter
                    autofocus>
                  </v-text-field>
                </template>
              </v-edit-dialog>
            </template>

          </v-data-table>
          <!--
            <div  v-for="resposta in dsResposta" :key="resposta.index" >
              {{resposta.index}}---{{resposta.attributeName}}
            </div>
          -->
          <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
            {{ snackText }}

            <template v-slot:action="{ attrs }">
              <v-btn v-bind="attrs" text @click="snack = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-card>
        <v-btn text> Cancelar </v-btn>

        <v-btn @click="voltar"> Voltar </v-btn>
        <v-btn color="primary" @click="avancar"> Continuar </v-btn>
      </v-stepper-content>
      <!-- teste T -->
      <v-stepper-content step="4">
        <v-card class="mb-12"></v-card>
        <v-select v-model="select" :items="dsResposta" item-text="index" persistent-hint return-object single-line
          v-on:change="mudarVariavel()">
          <template slot="selection">
            Y<sub> {{ select.index }}</sub> - {{ select.nome }}
          </template>
          <template v-slot:item="{ item }">
            Y<sub> {{ item.index }}</sub> - {{ item.nome }}
          </template>
          <template v-slot:option="item">
            Y<sub> {{ item.index }}</sub> - {{ item.nome }}
          </template>
        </v-select>

        <v-data-table :headers="headersTesteT" :items="dsTesteT" disable-pagination :hide-default-footer="true">
          <template v-slot:[`item.resposta`]="props">
            <v-checkbox v-model="props.item.resposta"></v-checkbox>
          </template>
          <template v-slot:[`item.X`]="props">
            <div v-if="props.item.X == 0"> media </div>
            <div v-else>
              <span v-for="item in props.item.X">X<sub> {{ item }}</sub> </span>
            </div>

          </template>
        </v-data-table>
        <!-- funcao de regrecao  -->
        <div style="margin-top: 6rem; margin-bottom: 6rem;">
          <span> Ŷ<sub> {{ select.index }}</sub> = </span>
          <span v-for="item in dsTesteT ">
            <span v-if="(item.B > 0) "> + </span>
            <span v-if="item.X == 0">
              {{ item.B }}
            </span>

            <span v-else="item.X == 0 ">
              {{ item.B }}
              <span v-for="item in item.X">X<sub> {{ item }}</sub> </span>
            </span>
          </span>
        </div>
        <v-btn text> Cancelar </v-btn>

        <v-btn @click="voltar"> Voltar </v-btn>
        <v-btn color="primary" @click="avancar"> Continuar </v-btn>
      </v-stepper-content>
      <!-- TabAnova -->
      <v-stepper-content step="5">
        <div style="max-width:50% ;">
          <div id="container1"></div>
        </div>
        <div id="container2"></div>
        <div id="myDiv"></div>
        <v-card class="mb-12"></v-card>
        <v-select v-model="select" :items="dsResposta" item-text="index" persistent-hint return-object single-line
          v-on:change="mudarVariavel()">
          <template slot="selection">
            Y<sub> {{ select.index }}</sub> - {{ select.nome }}
          </template>
          <template v-slot:item="{ item }">
            Y<sub> {{ item.index }}</sub> - {{ item.nome }}
          </template>
          <template v-slot:option="item">
            Y<sub> {{ item.index }}</sub> - {{ item.nome }}
          </template>
        </v-select>
        <v-data-table :headers="headersTabAnova" :items="dsTabAnova" disable-pagination :hide-default-footer="true">
        </v-data-table>

        <!-- <span>Y = <span v-for="(item, index) in dsTesteT" >{{item.be}}</span></span> -->
        <v-btn @click="voltar"> Voltar </v-btn>
        <v-btn color="primary" @click="avancar"> Continuar </v-btn>
      </v-stepper-content>
    </v-stepper-items>
    <!-- <div style="height : 0.5w ;    width:0.5w; color:red ">
      
    <div id="myDiv"></div>

    </div> -->
  </v-stepper>

</template>
<script>
import Highcharts from 'highcharts'
import pareto from 'highcharts/modules/pareto';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';
import Plotly from "plotly.js-dist";
import accessibility from 'highcharts/modules/accessibility';
import axios from "axios";
import { create, all } from 'mathjs';

//import matrix from 'matrix-js'

export default {
  // https://codepen.io/duq/pen/PegPrJ
  // https://thewebdev.info/2020/08/15/vuetify%E2%80%8A-%E2%80%8Aedit-table-content/
  // https://www.codegrepper.com/code-examples/whatever/vuetify+editable+table
  // https://www.codeply.com/p/CMcTQVlHvp/vuetify-editable-datatable
  name: "DCC",
  components: {
    Plotly
  },
  data: () => ({

    //url:'https://apiplanex.herokuapp.com',//heroku
    url: 'http://127.0.0.1:5000',//local
    NReplicadas: 2,
    NRespostas: 2,
    tela: 1,
    Nvariaveis: 2,
    snack: false,
    snackColor: "",
    snackText: "",
    headersVariaveis: [
      {
        text: "Simbolo das variáveis",
        align: "start",
        sortable: false,
        value: "index",
      },
      {
        text: "Identifique as variáveis ",
        align: "start",
        sortable: false,
        value: "name",
      },
      {
        text: "Identifique as unidade de medida",
        align: "start",
        sortable: false,
        value: "unidade",
      },
      {
        text: "nível menor(-1)",
        align: "start",
        sortable: false,
        value: "vBaixo",
      },
      {
        text: "nível Maior(+1)",
        align: "start",
        sortable: false,
        value: "vAlto",
      },
    ],
    headersResposta: [
      {
        text: "Simbolo das Resposta",
        align: "start",
        sortable: false,
        value: "index",
      },
      {
        text: "Identifique as resposta ",
        align: "start",
        sortable: false,
        value: "nome",
      },
      {
        text: "Identifique as unidade de medida",
        align: "start",
        sortable: false,
        value: "unidade",
      },
    ],
    headersMatrizX:   [],
    headersTesteT:    [],
    headerssTesteT:   [],
    headersTabAnova:  [],
    dsVariaveis: [
      {
        "nome": "",
        "index": "1",
        "unidade": " ",
        "vBaixo": -1,
        "vAlto": 1
      },
      {
        "nome": "",
        "index": "2",
        "unidade": " ",
        "vBaixo": -1,
        "vAlto": 1
      }
    ],
    dsResposta: [
      {
        "nome": "_",
        "index": "1",
        "unidade": "_"
      },
      {
        "nome": "_",
        "index": "2",
        "unidade": "_"
      }
    ],
    select: {
      "nome": "selecione uma resposta",
      "index": "0",
      "unidade": " "
    },
    selectAnterior: {
      "nome": "selecione uma resposta",
      "index": "0",
      "unidade": " "
    },
    dsMatrix:     [],
    MatrixDecode: [],
    dsTesteT:     [],
    dssTesteT:    [],
    dsTabAnova:   [],
    dssTabAnova:  [],
    dataSurface:  [
    {
        "x": [
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -0.9,
            -0.9,
            -0.9,
            -0.9,
            -0.9,
            -0.9,
            -0.9,
            -0.9,
            -0.9,
            -0.9,
            -0.9,
            -0.9,
            -0.9,
            -0.9,
            -0.9,
            -0.9,
            -0.9,
            -0.9,
            -0.9,
            -0.9,
            -0.9,
            -0.8,
            -0.8,
            -0.8,
            -0.8,
            -0.8,
            -0.8,
            -0.8,
            -0.8,
            -0.8,
            -0.8,
            -0.8,
            -0.8,
            -0.8,
            -0.8,
            -0.8,
            -0.8,
            -0.8,
            -0.8,
            -0.8,
            -0.8,
            -0.8,
            -0.7,
            -0.7,
            -0.7,
            -0.7,
            -0.7,
            -0.7,
            -0.7,
            -0.7,
            -0.7,
            -0.7,
            -0.7,
            -0.7,
            -0.7,
            -0.7,
            -0.7,
            -0.7,
            -0.7,
            -0.7,
            -0.7,
            -0.7,
            -0.7,
            -0.6,
            -0.6,
            -0.6,
            -0.6,
            -0.6,
            -0.6,
            -0.6,
            -0.6,
            -0.6,
            -0.6,
            -0.6,
            -0.6,
            -0.6,
            -0.6,
            -0.6,
            -0.6,
            -0.6,
            -0.6,
            -0.6,
            -0.6,
            -0.6,
            -0.5,
            -0.5,
            -0.5,
            -0.5,
            -0.5,
            -0.5,
            -0.5,
            -0.5,
            -0.5,
            -0.5,
            -0.5,
            -0.5,
            -0.5,
            -0.5,
            -0.5,
            -0.5,
            -0.5,
            -0.5,
            -0.5,
            -0.5,
            -0.5,
            -0.3999999999999999,
            -0.3999999999999999,
            -0.3999999999999999,
            -0.3999999999999999,
            -0.3999999999999999,
            -0.3999999999999999,
            -0.3999999999999999,
            -0.3999999999999999,
            -0.3999999999999999,
            -0.3999999999999999,
            -0.3999999999999999,
            -0.3999999999999999,
            -0.3999999999999999,
            -0.3999999999999999,
            -0.3999999999999999,
            -0.3999999999999999,
            -0.3999999999999999,
            -0.3999999999999999,
            -0.3999999999999999,
            -0.3999999999999999,
            -0.3999999999999999,
            -0.29999999999999993,
            -0.29999999999999993,
            -0.29999999999999993,
            -0.29999999999999993,
            -0.29999999999999993,
            -0.29999999999999993,
            -0.29999999999999993,
            -0.29999999999999993,
            -0.29999999999999993,
            -0.29999999999999993,
            -0.29999999999999993,
            -0.29999999999999993,
            -0.29999999999999993,
            -0.29999999999999993,
            -0.29999999999999993,
            -0.29999999999999993,
            -0.29999999999999993,
            -0.29999999999999993,
            -0.29999999999999993,
            -0.29999999999999993,
            -0.29999999999999993,
            -0.19999999999999996,
            -0.19999999999999996,
            -0.19999999999999996,
            -0.19999999999999996,
            -0.19999999999999996,
            -0.19999999999999996,
            -0.19999999999999996,
            -0.19999999999999996,
            -0.19999999999999996,
            -0.19999999999999996,
            -0.19999999999999996,
            -0.19999999999999996,
            -0.19999999999999996,
            -0.19999999999999996,
            -0.19999999999999996,
            -0.19999999999999996,
            -0.19999999999999996,
            -0.19999999999999996,
            -0.19999999999999996,
            -0.19999999999999996,
            -0.19999999999999996,
            -0.09999999999999998,
            -0.09999999999999998,
            -0.09999999999999998,
            -0.09999999999999998,
            -0.09999999999999998,
            -0.09999999999999998,
            -0.09999999999999998,
            -0.09999999999999998,
            -0.09999999999999998,
            -0.09999999999999998,
            -0.09999999999999998,
            -0.09999999999999998,
            -0.09999999999999998,
            -0.09999999999999998,
            -0.09999999999999998,
            -0.09999999999999998,
            -0.09999999999999998,
            -0.09999999999999998,
            -0.09999999999999998,
            -0.09999999999999998,
            -0.09999999999999998,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0.10000000000000009,
            0.10000000000000009,
            0.10000000000000009,
            0.10000000000000009,
            0.10000000000000009,
            0.10000000000000009,
            0.10000000000000009,
            0.10000000000000009,
            0.10000000000000009,
            0.10000000000000009,
            0.10000000000000009,
            0.10000000000000009,
            0.10000000000000009,
            0.10000000000000009,
            0.10000000000000009,
            0.10000000000000009,
            0.10000000000000009,
            0.10000000000000009,
            0.10000000000000009,
            0.10000000000000009,
            0.10000000000000009,
            0.20000000000000018,
            0.20000000000000018,
            0.20000000000000018,
            0.20000000000000018,
            0.20000000000000018,
            0.20000000000000018,
            0.20000000000000018,
            0.20000000000000018,
            0.20000000000000018,
            0.20000000000000018,
            0.20000000000000018,
            0.20000000000000018,
            0.20000000000000018,
            0.20000000000000018,
            0.20000000000000018,
            0.20000000000000018,
            0.20000000000000018,
            0.20000000000000018,
            0.20000000000000018,
            0.20000000000000018,
            0.20000000000000018,
            0.30000000000000004,
            0.30000000000000004,
            0.30000000000000004,
            0.30000000000000004,
            0.30000000000000004,
            0.30000000000000004,
            0.30000000000000004,
            0.30000000000000004,
            0.30000000000000004,
            0.30000000000000004,
            0.30000000000000004,
            0.30000000000000004,
            0.30000000000000004,
            0.30000000000000004,
            0.30000000000000004,
            0.30000000000000004,
            0.30000000000000004,
            0.30000000000000004,
            0.30000000000000004,
            0.30000000000000004,
            0.30000000000000004,
            0.40000000000000013,
            0.40000000000000013,
            0.40000000000000013,
            0.40000000000000013,
            0.40000000000000013,
            0.40000000000000013,
            0.40000000000000013,
            0.40000000000000013,
            0.40000000000000013,
            0.40000000000000013,
            0.40000000000000013,
            0.40000000000000013,
            0.40000000000000013,
            0.40000000000000013,
            0.40000000000000013,
            0.40000000000000013,
            0.40000000000000013,
            0.40000000000000013,
            0.40000000000000013,
            0.40000000000000013,
            0.40000000000000013,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.6000000000000001,
            0.6000000000000001,
            0.6000000000000001,
            0.6000000000000001,
            0.6000000000000001,
            0.6000000000000001,
            0.6000000000000001,
            0.6000000000000001,
            0.6000000000000001,
            0.6000000000000001,
            0.6000000000000001,
            0.6000000000000001,
            0.6000000000000001,
            0.6000000000000001,
            0.6000000000000001,
            0.6000000000000001,
            0.6000000000000001,
            0.6000000000000001,
            0.6000000000000001,
            0.6000000000000001,
            0.6000000000000001,
            0.7000000000000002,
            0.7000000000000002,
            0.7000000000000002,
            0.7000000000000002,
            0.7000000000000002,
            0.7000000000000002,
            0.7000000000000002,
            0.7000000000000002,
            0.7000000000000002,
            0.7000000000000002,
            0.7000000000000002,
            0.7000000000000002,
            0.7000000000000002,
            0.7000000000000002,
            0.7000000000000002,
            0.7000000000000002,
            0.7000000000000002,
            0.7000000000000002,
            0.7000000000000002,
            0.7000000000000002,
            0.7000000000000002,
            0.8,
            0.8,
            0.8,
            0.8,
            0.8,
            0.8,
            0.8,
            0.8,
            0.8,
            0.8,
            0.8,
            0.8,
            0.8,
            0.8,
            0.8,
            0.8,
            0.8,
            0.8,
            0.8,
            0.8,
            0.8,
            0.9000000000000001,
            0.9000000000000001,
            0.9000000000000001,
            0.9000000000000001,
            0.9000000000000001,
            0.9000000000000001,
            0.9000000000000001,
            0.9000000000000001,
            0.9000000000000001,
            0.9000000000000001,
            0.9000000000000001,
            0.9000000000000001,
            0.9000000000000001,
            0.9000000000000001,
            0.9000000000000001,
            0.9000000000000001,
            0.9000000000000001,
            0.9000000000000001,
            0.9000000000000001,
            0.9000000000000001,
            0.9000000000000001,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1
        ],
        "y": [
            -1,
            -0.9,
            -0.8,
            -0.7,
            -0.6,
            -0.5,
            -0.3999999999999999,
            -0.29999999999999993,
            -0.19999999999999996,
            -0.09999999999999998,
            0,
            0.10000000000000009,
            0.20000000000000018,
            0.30000000000000004,
            0.40000000000000013,
            0.5,
            0.6000000000000001,
            0.7000000000000002,
            0.8,
            0.9000000000000001,
            1,
            -1,
            -0.9,
            -0.8,
            -0.7,
            -0.6,
            -0.5,
            -0.3999999999999999,
            -0.29999999999999993,
            -0.19999999999999996,
            -0.09999999999999998,
            0,
            0.10000000000000009,
            0.20000000000000018,
            0.30000000000000004,
            0.40000000000000013,
            0.5,
            0.6000000000000001,
            0.7000000000000002,
            0.8,
            0.9000000000000001,
            1,
            -1,
            -0.9,
            -0.8,
            -0.7,
            -0.6,
            -0.5,
            -0.3999999999999999,
            -0.29999999999999993,
            -0.19999999999999996,
            -0.09999999999999998,
            0,
            0.10000000000000009,
            0.20000000000000018,
            0.30000000000000004,
            0.40000000000000013,
            0.5,
            0.6000000000000001,
            0.7000000000000002,
            0.8,
            0.9000000000000001,
            1,
            -1,
            -0.9,
            -0.8,
            -0.7,
            -0.6,
            -0.5,
            -0.3999999999999999,
            -0.29999999999999993,
            -0.19999999999999996,
            -0.09999999999999998,
            0,
            0.10000000000000009,
            0.20000000000000018,
            0.30000000000000004,
            0.40000000000000013,
            0.5,
            0.6000000000000001,
            0.7000000000000002,
            0.8,
            0.9000000000000001,
            1,
            -1,
            -0.9,
            -0.8,
            -0.7,
            -0.6,
            -0.5,
            -0.3999999999999999,
            -0.29999999999999993,
            -0.19999999999999996,
            -0.09999999999999998,
            0,
            0.10000000000000009,
            0.20000000000000018,
            0.30000000000000004,
            0.40000000000000013,
            0.5,
            0.6000000000000001,
            0.7000000000000002,
            0.8,
            0.9000000000000001,
            1,
            -1,
            -0.9,
            -0.8,
            -0.7,
            -0.6,
            -0.5,
            -0.3999999999999999,
            -0.29999999999999993,
            -0.19999999999999996,
            -0.09999999999999998,
            0,
            0.10000000000000009,
            0.20000000000000018,
            0.30000000000000004,
            0.40000000000000013,
            0.5,
            0.6000000000000001,
            0.7000000000000002,
            0.8,
            0.9000000000000001,
            1,
            -1,
            -0.9,
            -0.8,
            -0.7,
            -0.6,
            -0.5,
            -0.3999999999999999,
            -0.29999999999999993,
            -0.19999999999999996,
            -0.09999999999999998,
            0,
            0.10000000000000009,
            0.20000000000000018,
            0.30000000000000004,
            0.40000000000000013,
            0.5,
            0.6000000000000001,
            0.7000000000000002,
            0.8,
            0.9000000000000001,
            1,
            -1,
            -0.9,
            -0.8,
            -0.7,
            -0.6,
            -0.5,
            -0.3999999999999999,
            -0.29999999999999993,
            -0.19999999999999996,
            -0.09999999999999998,
            0,
            0.10000000000000009,
            0.20000000000000018,
            0.30000000000000004,
            0.40000000000000013,
            0.5,
            0.6000000000000001,
            0.7000000000000002,
            0.8,
            0.9000000000000001,
            1,
            -1,
            -0.9,
            -0.8,
            -0.7,
            -0.6,
            -0.5,
            -0.3999999999999999,
            -0.29999999999999993,
            -0.19999999999999996,
            -0.09999999999999998,
            0,
            0.10000000000000009,
            0.20000000000000018,
            0.30000000000000004,
            0.40000000000000013,
            0.5,
            0.6000000000000001,
            0.7000000000000002,
            0.8,
            0.9000000000000001,
            1,
            -1,
            -0.9,
            -0.8,
            -0.7,
            -0.6,
            -0.5,
            -0.3999999999999999,
            -0.29999999999999993,
            -0.19999999999999996,
            -0.09999999999999998,
            0,
            0.10000000000000009,
            0.20000000000000018,
            0.30000000000000004,
            0.40000000000000013,
            0.5,
            0.6000000000000001,
            0.7000000000000002,
            0.8,
            0.9000000000000001,
            1,
            -1,
            -0.9,
            -0.8,
            -0.7,
            -0.6,
            -0.5,
            -0.3999999999999999,
            -0.29999999999999993,
            -0.19999999999999996,
            -0.09999999999999998,
            0,
            0.10000000000000009,
            0.20000000000000018,
            0.30000000000000004,
            0.40000000000000013,
            0.5,
            0.6000000000000001,
            0.7000000000000002,
            0.8,
            0.9000000000000001,
            1,
            -1,
            -0.9,
            -0.8,
            -0.7,
            -0.6,
            -0.5,
            -0.3999999999999999,
            -0.29999999999999993,
            -0.19999999999999996,
            -0.09999999999999998,
            0,
            0.10000000000000009,
            0.20000000000000018,
            0.30000000000000004,
            0.40000000000000013,
            0.5,
            0.6000000000000001,
            0.7000000000000002,
            0.8,
            0.9000000000000001,
            1,
            -1,
            -0.9,
            -0.8,
            -0.7,
            -0.6,
            -0.5,
            -0.3999999999999999,
            -0.29999999999999993,
            -0.19999999999999996,
            -0.09999999999999998,
            0,
            0.10000000000000009,
            0.20000000000000018,
            0.30000000000000004,
            0.40000000000000013,
            0.5,
            0.6000000000000001,
            0.7000000000000002,
            0.8,
            0.9000000000000001,
            1,
            -1,
            -0.9,
            -0.8,
            -0.7,
            -0.6,
            -0.5,
            -0.3999999999999999,
            -0.29999999999999993,
            -0.19999999999999996,
            -0.09999999999999998,
            0,
            0.10000000000000009,
            0.20000000000000018,
            0.30000000000000004,
            0.40000000000000013,
            0.5,
            0.6000000000000001,
            0.7000000000000002,
            0.8,
            0.9000000000000001,
            1,
            -1,
            -0.9,
            -0.8,
            -0.7,
            -0.6,
            -0.5,
            -0.3999999999999999,
            -0.29999999999999993,
            -0.19999999999999996,
            -0.09999999999999998,
            0,
            0.10000000000000009,
            0.20000000000000018,
            0.30000000000000004,
            0.40000000000000013,
            0.5,
            0.6000000000000001,
            0.7000000000000002,
            0.8,
            0.9000000000000001,
            1,
            -1,
            -0.9,
            -0.8,
            -0.7,
            -0.6,
            -0.5,
            -0.3999999999999999,
            -0.29999999999999993,
            -0.19999999999999996,
            -0.09999999999999998,
            0,
            0.10000000000000009,
            0.20000000000000018,
            0.30000000000000004,
            0.40000000000000013,
            0.5,
            0.6000000000000001,
            0.7000000000000002,
            0.8,
            0.9000000000000001,
            1,
            -1,
            -0.9,
            -0.8,
            -0.7,
            -0.6,
            -0.5,
            -0.3999999999999999,
            -0.29999999999999993,
            -0.19999999999999996,
            -0.09999999999999998,
            0,
            0.10000000000000009,
            0.20000000000000018,
            0.30000000000000004,
            0.40000000000000013,
            0.5,
            0.6000000000000001,
            0.7000000000000002,
            0.8,
            0.9000000000000001,
            1,
            -1,
            -0.9,
            -0.8,
            -0.7,
            -0.6,
            -0.5,
            -0.3999999999999999,
            -0.29999999999999993,
            -0.19999999999999996,
            -0.09999999999999998,
            0,
            0.10000000000000009,
            0.20000000000000018,
            0.30000000000000004,
            0.40000000000000013,
            0.5,
            0.6000000000000001,
            0.7000000000000002,
            0.8,
            0.9000000000000001,
            1,
            -1,
            -0.9,
            -0.8,
            -0.7,
            -0.6,
            -0.5,
            -0.3999999999999999,
            -0.29999999999999993,
            -0.19999999999999996,
            -0.09999999999999998,
            0,
            0.10000000000000009,
            0.20000000000000018,
            0.30000000000000004,
            0.40000000000000013,
            0.5,
            0.6000000000000001,
            0.7000000000000002,
            0.8,
            0.9000000000000001,
            1,
            -1,
            -0.9,
            -0.8,
            -0.7,
            -0.6,
            -0.5,
            -0.3999999999999999,
            -0.29999999999999993,
            -0.19999999999999996,
            -0.09999999999999998,
            0,
            0.10000000000000009,
            0.20000000000000018,
            0.30000000000000004,
            0.40000000000000013,
            0.5,
            0.6000000000000001,
            0.7000000000000002,
            0.8,
            0.9000000000000001,
            1,
            -1,
            -0.9,
            -0.8,
            -0.7,
            -0.6,
            -0.5,
            -0.3999999999999999,
            -0.29999999999999993,
            -0.19999999999999996,
            -0.09999999999999998,
            0,
            0.10000000000000009,
            0.20000000000000018,
            0.30000000000000004,
            0.40000000000000013,
            0.5,
            0.6000000000000001,
            0.7000000000000002,
            0.8,
            0.9000000000000001,
            1
        ],
        "z": [
            21,
            21.099999999999998,
            21.2,
            21.3,
            21.400000000000002,
            21.5,
            21.599999999999998,
            21.7,
            21.8,
            21.900000000000002,
            22,
            22.099999999999998,
            22.200000000000003,
            22.3,
            22.400000000000002,
            22.5,
            22.599999999999998,
            22.700000000000003,
            22.8,
            22.900000000000002,
            23,
            21.25,
            21.33,
            21.41,
            21.49,
            21.57,
            21.650000000000002,
            21.73,
            21.810000000000002,
            21.89,
            21.970000000000002,
            22.05,
            22.13,
            22.21,
            22.29,
            22.37,
            22.45,
            22.53,
            22.610000000000003,
            22.69,
            22.770000000000003,
            22.85,
            21.5,
            21.56,
            21.62,
            21.68,
            21.740000000000002,
            21.8,
            21.86,
            21.92,
            21.98,
            22.040000000000003,
            22.1,
            22.16,
            22.220000000000002,
            22.28,
            22.340000000000003,
            22.400000000000002,
            22.46,
            22.520000000000003,
            22.580000000000002,
            22.640000000000004,
            22.700000000000003,
            21.75,
            21.789999999999996,
            21.83,
            21.869999999999997,
            21.91,
            21.95,
            21.99,
            22.03,
            22.069999999999997,
            22.11,
            22.15,
            22.189999999999998,
            22.23,
            22.27,
            22.31,
            22.349999999999998,
            22.389999999999997,
            22.43,
            22.47,
            22.51,
            22.549999999999997,
            22,
            22.019999999999996,
            22.04,
            22.06,
            22.080000000000002,
            22.099999999999998,
            22.119999999999997,
            22.14,
            22.16,
            22.18,
            22.2,
            22.22,
            22.240000000000002,
            22.259999999999998,
            22.28,
            22.3,
            22.319999999999997,
            22.34,
            22.36,
            22.380000000000003,
            22.4,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.5,
            22.48,
            22.46,
            22.44,
            22.42,
            22.400000000000002,
            22.38,
            22.360000000000003,
            22.34,
            22.320000000000004,
            22.3,
            22.279999999999998,
            22.26,
            22.24,
            22.220000000000002,
            22.2,
            22.18,
            22.16,
            22.14,
            22.12,
            22.1,
            22.75,
            22.71,
            22.67,
            22.630000000000003,
            22.590000000000003,
            22.55,
            22.51,
            22.470000000000002,
            22.43,
            22.390000000000004,
            22.35,
            22.31,
            22.270000000000003,
            22.23,
            22.19,
            22.150000000000002,
            22.11,
            22.070000000000004,
            22.03,
            21.990000000000002,
            21.950000000000003,
            23,
            22.939999999999998,
            22.88,
            22.819999999999997,
            22.76,
            22.7,
            22.639999999999997,
            22.58,
            22.52,
            22.46,
            22.4,
            22.339999999999996,
            22.279999999999998,
            22.22,
            22.16,
            22.099999999999998,
            22.039999999999996,
            21.98,
            21.919999999999998,
            21.86,
            21.799999999999997,
            23.25,
            23.169999999999998,
            23.09,
            23.009999999999998,
            22.93,
            22.849999999999998,
            22.77,
            22.69,
            22.61,
            22.53,
            22.45,
            22.369999999999997,
            22.29,
            22.209999999999997,
            22.13,
            22.05,
            21.97,
            21.89,
            21.81,
            21.73,
            21.65,
            23.5,
            23.4,
            23.3,
            23.2,
            23.1,
            23,
            22.9,
            22.8,
            22.7,
            22.6,
            22.5,
            22.4,
            22.3,
            22.2,
            22.1,
            22,
            21.9,
            21.8,
            21.7,
            21.6,
            21.5,
            23.75,
            23.63,
            23.51,
            23.39,
            23.270000000000003,
            23.150000000000002,
            23.029999999999998,
            22.91,
            22.79,
            22.67,
            22.55,
            22.43,
            22.310000000000002,
            22.19,
            22.07,
            21.95,
            21.83,
            21.71,
            21.59,
            21.470000000000002,
            21.35,
            24,
            23.86,
            23.720000000000002,
            23.580000000000002,
            23.440000000000005,
            23.3,
            23.16,
            23.020000000000003,
            22.88,
            22.740000000000002,
            22.6,
            22.46,
            22.32,
            22.18,
            22.040000000000003,
            21.900000000000002,
            21.759999999999998,
            21.62,
            21.48,
            21.340000000000003,
            21.200000000000003,
            24.25,
            24.089999999999996,
            23.93,
            23.77,
            23.61,
            23.45,
            23.289999999999996,
            23.13,
            22.97,
            22.81,
            22.65,
            22.49,
            22.33,
            22.169999999999998,
            22.01,
            21.849999999999998,
            21.689999999999998,
            21.529999999999998,
            21.369999999999997,
            21.21,
            21.049999999999997,
            24.5,
            24.319999999999997,
            24.14,
            23.959999999999997,
            23.78,
            23.599999999999998,
            23.419999999999998,
            23.24,
            23.06,
            22.88,
            22.7,
            22.519999999999996,
            22.34,
            22.16,
            21.98,
            21.8,
            21.619999999999997,
            21.44,
            21.259999999999998,
            21.080000000000002,
            20.9,
            24.75,
            24.549999999999997,
            24.35,
            24.15,
            23.950000000000003,
            23.75,
            23.549999999999997,
            23.35,
            23.15,
            22.950000000000003,
            22.75,
            22.549999999999997,
            22.35,
            22.15,
            21.950000000000003,
            21.75,
            21.549999999999997,
            21.35,
            21.15,
            20.950000000000003,
            20.75,
            25,
            24.78,
            24.560000000000002,
            24.34,
            24.12,
            23.900000000000002,
            23.68,
            23.46,
            23.24,
            23.020000000000003,
            22.8,
            22.58,
            22.36,
            22.14,
            21.92,
            21.7,
            21.48,
            21.26,
            21.04,
            20.82,
            20.6,
            25.25,
            25.01,
            24.770000000000003,
            24.53,
            24.290000000000003,
            24.05,
            23.81,
            23.570000000000004,
            23.330000000000002,
            23.090000000000003,
            22.85,
            22.61,
            22.37,
            22.13,
            21.890000000000004,
            21.650000000000002,
            21.41,
            21.17,
            20.93,
            20.69,
            20.450000000000003,
            25.5,
            25.24,
            24.98,
            24.72,
            24.46,
            24.2,
            23.939999999999998,
            23.68,
            23.419999999999998,
            23.16,
            22.9,
            22.639999999999997,
            22.38,
            22.119999999999997,
            21.86,
            21.599999999999998,
            21.339999999999996,
            21.08,
            20.819999999999997,
            20.56,
            20.299999999999997,
            25.75,
            25.47,
            25.19,
            24.91,
            24.630000000000003,
            24.349999999999998,
            24.069999999999997,
            23.79,
            23.509999999999998,
            23.23,
            22.95,
            22.669999999999998,
            22.39,
            22.11,
            21.830000000000002,
            21.55,
            21.269999999999996,
            20.99,
            20.709999999999997,
            20.43,
            20.15,
            26,
            25.7,
            25.400000000000002,
            25.099999999999998,
            24.8,
            24.5,
            24.2,
            23.900000000000002,
            23.599999999999998,
            23.3,
            23,
            22.7,
            22.4,
            22.099999999999998,
            21.8,
            21.5,
            21.2,
            20.9,
            20.599999999999998,
            20.3,
            20
        ],
        "type": "mesh3d",
        "intensity": [
            21,
            21.099999999999998,
            21.2,
            21.3,
            21.400000000000002,
            21.5,
            21.599999999999998,
            21.7,
            21.8,
            21.900000000000002,
            22,
            22.099999999999998,
            22.200000000000003,
            22.3,
            22.400000000000002,
            22.5,
            22.599999999999998,
            22.700000000000003,
            22.8,
            22.900000000000002,
            23,
            21.25,
            21.33,
            21.41,
            21.49,
            21.57,
            21.650000000000002,
            21.73,
            21.810000000000002,
            21.89,
            21.970000000000002,
            22.05,
            22.13,
            22.21,
            22.29,
            22.37,
            22.45,
            22.53,
            22.610000000000003,
            22.69,
            22.770000000000003,
            22.85,
            21.5,
            21.56,
            21.62,
            21.68,
            21.740000000000002,
            21.8,
            21.86,
            21.92,
            21.98,
            22.040000000000003,
            22.1,
            22.16,
            22.220000000000002,
            22.28,
            22.340000000000003,
            22.400000000000002,
            22.46,
            22.520000000000003,
            22.580000000000002,
            22.640000000000004,
            22.700000000000003,
            21.75,
            21.789999999999996,
            21.83,
            21.869999999999997,
            21.91,
            21.95,
            21.99,
            22.03,
            22.069999999999997,
            22.11,
            22.15,
            22.189999999999998,
            22.23,
            22.27,
            22.31,
            22.349999999999998,
            22.389999999999997,
            22.43,
            22.47,
            22.51,
            22.549999999999997,
            22,
            22.019999999999996,
            22.04,
            22.06,
            22.080000000000002,
            22.099999999999998,
            22.119999999999997,
            22.14,
            22.16,
            22.18,
            22.2,
            22.22,
            22.240000000000002,
            22.259999999999998,
            22.28,
            22.3,
            22.319999999999997,
            22.34,
            22.36,
            22.380000000000003,
            22.4,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.25,
            22.5,
            22.48,
            22.46,
            22.44,
            22.42,
            22.400000000000002,
            22.38,
            22.360000000000003,
            22.34,
            22.320000000000004,
            22.3,
            22.279999999999998,
            22.26,
            22.24,
            22.220000000000002,
            22.2,
            22.18,
            22.16,
            22.14,
            22.12,
            22.1,
            22.75,
            22.71,
            22.67,
            22.630000000000003,
            22.590000000000003,
            22.55,
            22.51,
            22.470000000000002,
            22.43,
            22.390000000000004,
            22.35,
            22.31,
            22.270000000000003,
            22.23,
            22.19,
            22.150000000000002,
            22.11,
            22.070000000000004,
            22.03,
            21.990000000000002,
            21.950000000000003,
            23,
            22.939999999999998,
            22.88,
            22.819999999999997,
            22.76,
            22.7,
            22.639999999999997,
            22.58,
            22.52,
            22.46,
            22.4,
            22.339999999999996,
            22.279999999999998,
            22.22,
            22.16,
            22.099999999999998,
            22.039999999999996,
            21.98,
            21.919999999999998,
            21.86,
            21.799999999999997,
            23.25,
            23.169999999999998,
            23.09,
            23.009999999999998,
            22.93,
            22.849999999999998,
            22.77,
            22.69,
            22.61,
            22.53,
            22.45,
            22.369999999999997,
            22.29,
            22.209999999999997,
            22.13,
            22.05,
            21.97,
            21.89,
            21.81,
            21.73,
            21.65,
            23.5,
            23.4,
            23.3,
            23.2,
            23.1,
            23,
            22.9,
            22.8,
            22.7,
            22.6,
            22.5,
            22.4,
            22.3,
            22.2,
            22.1,
            22,
            21.9,
            21.8,
            21.7,
            21.6,
            21.5,
            23.75,
            23.63,
            23.51,
            23.39,
            23.270000000000003,
            23.150000000000002,
            23.029999999999998,
            22.91,
            22.79,
            22.67,
            22.55,
            22.43,
            22.310000000000002,
            22.19,
            22.07,
            21.95,
            21.83,
            21.71,
            21.59,
            21.470000000000002,
            21.35,
            24,
            23.86,
            23.720000000000002,
            23.580000000000002,
            23.440000000000005,
            23.3,
            23.16,
            23.020000000000003,
            22.88,
            22.740000000000002,
            22.6,
            22.46,
            22.32,
            22.18,
            22.040000000000003,
            21.900000000000002,
            21.759999999999998,
            21.62,
            21.48,
            21.340000000000003,
            21.200000000000003,
            24.25,
            24.089999999999996,
            23.93,
            23.77,
            23.61,
            23.45,
            23.289999999999996,
            23.13,
            22.97,
            22.81,
            22.65,
            22.49,
            22.33,
            22.169999999999998,
            22.01,
            21.849999999999998,
            21.689999999999998,
            21.529999999999998,
            21.369999999999997,
            21.21,
            21.049999999999997,
            24.5,
            24.319999999999997,
            24.14,
            23.959999999999997,
            23.78,
            23.599999999999998,
            23.419999999999998,
            23.24,
            23.06,
            22.88,
            22.7,
            22.519999999999996,
            22.34,
            22.16,
            21.98,
            21.8,
            21.619999999999997,
            21.44,
            21.259999999999998,
            21.080000000000002,
            20.9,
            24.75,
            24.549999999999997,
            24.35,
            24.15,
            23.950000000000003,
            23.75,
            23.549999999999997,
            23.35,
            23.15,
            22.950000000000003,
            22.75,
            22.549999999999997,
            22.35,
            22.15,
            21.950000000000003,
            21.75,
            21.549999999999997,
            21.35,
            21.15,
            20.950000000000003,
            20.75,
            25,
            24.78,
            24.560000000000002,
            24.34,
            24.12,
            23.900000000000002,
            23.68,
            23.46,
            23.24,
            23.020000000000003,
            22.8,
            22.58,
            22.36,
            22.14,
            21.92,
            21.7,
            21.48,
            21.26,
            21.04,
            20.82,
            20.6,
            25.25,
            25.01,
            24.770000000000003,
            24.53,
            24.290000000000003,
            24.05,
            23.81,
            23.570000000000004,
            23.330000000000002,
            23.090000000000003,
            22.85,
            22.61,
            22.37,
            22.13,
            21.890000000000004,
            21.650000000000002,
            21.41,
            21.17,
            20.93,
            20.69,
            20.450000000000003,
            25.5,
            25.24,
            24.98,
            24.72,
            24.46,
            24.2,
            23.939999999999998,
            23.68,
            23.419999999999998,
            23.16,
            22.9,
            22.639999999999997,
            22.38,
            22.119999999999997,
            21.86,
            21.599999999999998,
            21.339999999999996,
            21.08,
            20.819999999999997,
            20.56,
            20.299999999999997,
            25.75,
            25.47,
            25.19,
            24.91,
            24.630000000000003,
            24.349999999999998,
            24.069999999999997,
            23.79,
            23.509999999999998,
            23.23,
            22.95,
            22.669999999999998,
            22.39,
            22.11,
            21.830000000000002,
            21.55,
            21.269999999999996,
            20.99,
            20.709999999999997,
            20.43,
            20.15,
            26,
            25.7,
            25.400000000000002,
            25.099999999999998,
            24.8,
            24.5,
            24.2,
            23.900000000000002,
            23.599999999999998,
            23.3,
            23,
            22.7,
            22.4,
            22.099999999999998,
            21.8,
            21.5,
            21.2,
            20.9,
            20.599999999999998,
            20.3,
            20
        ],
        "colorscale": [
            [
                0,
                "#FAE800"
            ],
            [
                0.5,
                "#EB8C00"
            ],
            [
                1,
                "#F52102"
            ]
        ]
      }],

    layoutSurface: {
      title: "superfice de regresao",
      Zaxis: {title: "Resposta" },
      },
    opitionChart2: {
      title: {
        text: 'grafico de pareto'
      },
      tooltip: {
        shared: true
      },
      xAxis: {
        categories: [
          'media', "x1", "x2"
        ],
        crosshair: true
      },
      yAxis: [{
        title: {
          text: 'T Critico'
        },
        min: 0,
      },
      {
        title: {
          text: 'Betas'
        },
        // max: 1,
      }
      ]
      ,
      series: [{
        type: 'line',
        name: 'T critico ',
        yAxis: 1,
        data: [0.5, 0.5, 0.5]
      }, {
        type: 'column',
        name: 'Betas',
        yAxis: 0,
        data: [51, 36, 10]
      }]
    },
    opitionChart1: {
      chart: {
        zoomType: 'xy',
        height:  '100%'
      },
      title: {
        text: 'Valores Experimentais × Preditos'
      },
      // subtitle: {
      //   text: 'Source: Heinz  2003'
      // },
      xAxis: {
        title: {
          enabled: true,
          text: 'valor experimental'
        },
        crosshair: true
        // startOnTick: true,
        // endOnTick: true,
        // showLastLabel: true
      },
      yAxis: {
        type: "linear",
        width: 10,
        crosshair: true,
        alignTicks: false,
        title: {
          text: 'valor predito'
        }
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
        borderWidth: 1
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 5,
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)'
              }
            }
          },
          states: {
            hover: {
              marker: {
                enabled: false
              }
            }
          },
          tooltip: {
            pointFormat: '{point.x} experimental , {point.y} predito'
          }
        }
      },
      series: [{
        type: 'scatter',
        color: 'rgba(223, 83, 83, .5)',
        data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6]]

      }, {
        type: 'line',
        name: 'linha de regressao ',
        marker: {
          enabled: false
        },
        enableMouseTracking: false,
        color: 'rgba(119, 152, 191, .5)',
        data: [[0, 0], [1, 1]]
      }]
    },
    regressaoChat: null,
    regressaoChat2: null,
    max25chars: (v) => v.length <= 25 || "nome muito longo !",
  }),

  methods: {
    log(val){
      console.log("val",val);
    },
    numberRule: (val) => {
      if (val < 0) return "insira um valor positivo ";
      return true;
    },
    avancar() {
      switch (this.tela) {
        case 2:
          this.definirMatx();
          break;

        case 3: {

          for (let index = 0; index < this.dsResposta.length; index++) {
            const element = this.dsResposta[index];
            let matrisY = [];
            matrisY[element.index] = this.dsMatrix.map(v => [v[element.attributeName]]);
            //matrisY[element.index] = [[1.0],[2.0],[3.0],[4.0],[5.1],[5.0]]

            matrisY[element.index] = JSON.stringify(matrisY[element.index]);

            axios
              .get(this.url + "/matriTesteT/" + this.Nvariaveis + "/" + this.NReplicadas + "/" + matrisY[element.index])
              .then(resp => {
                this.dssTesteT[element.index] = resp.data.data.map(d => {
                  return { ...d, resposta: true }
                });

                this.headerssTesteT[element.index] = resp.data.schema.fields.map(f => {
                  return {
                    text: f.name,
                    align: "start",
                    sortable: false,
                    value: f.name,
                  }
                });
                this.headerssTesteT[element.index].push({
                  text: "aceitação/regeicao",
                  align: "start",
                  sortable: false,
                  value: "resposta",
                })
                this.dssTesteT[element.index].map(f => {
                  f["t crítico"] = f["t crítico"] == null ? 0 : f["t crítico"].toFixed(6);
                  f["H0"] = f["H0"] == null ? 0 : f["H0"].toFixed(6);
                  f["er"] = f["er"] == null ? 0 : f["er"].toFixed(6);
                  f["B"] = f["B"] == null ? 0 : f["B"].toFixed(6);
                  //f["t[(B - H0)/er]"] = f["t[(B - H0)/er]"] == null ? 0 : f["t[(B - H0)/er]"].toFixed(6);
                  f["t Calculado"] = f["t Calculado"] == null ? 0 : f["t Calculado"].toFixed(6);
                  f["p-valor"] = f["p-valor"] == null ? 0 : f["p-valor"].toFixed(6);
                })

              })

          }

          this.select = this.dsResposta[0];
          this.selectAnterior = this.select;
          this.dsTesteT = this.dssTesteT[this.select.index];
          this.headersTesteT = this.headerssTesteT[this.select.index];
        }
          break

        case 4:
          for (let index = 0; index < this.dsResposta.length; index++) {
            const element = this.dsResposta[index];
            let matrisY = [];

            matrisY[element.index] = this.dsMatrix.map(v => [v[element.attributeName]]);
            matrisY[element.index] = JSON.stringify(matrisY[element.index]);

            let matrisY1 = [];
            matrisY1[element.index] = this.dssTesteT[element.index].map(v => [v.resposta == true ? 1 : 0]);
            matrisY1[element.index] = JSON.stringify(matrisY1[element.index]);

            axios
              .get(this.url + "/tab_anova/" + this.Nvariaveis + "/" + this.NReplicadas + "/" + matrisY[element.index] + "/" + matrisY1[element.index])
              .then(resp => {
                this.dssTabAnova[element.index] = resp.data.data

                this.headersTabAnova = resp.data.schema.fields.map(f => {
                  return {
                    text: f.name,
                    align: "start",
                    sortable: false,
                    value: f.name,
                  }
                });
              })
          }
          this.mudarVariavel();
          break
        default:
          break;
      }

      if (this.tela <= 4) {
        this.tela++;
      }

    },
    definirMatx() {
      axios
        .get(this.url + "/matrix/" + this.Nvariaveis + "/" + this.NReplicadas)
        .then((resp) => {
          // DEFININDO TABELA PARA CALCULOS
          this.MatrixDecode = resp.data;
          let variaveis = resp.data.slice(1, this.Nvariaveis + 1);
          let variaveisEstruct = []

          for (let i = 0; i < variaveis[0].length; i++) {
            variaveisEstruct.push(new Object);
          }
          this.headersMatrizX = [];
          for (let e = 0; e < variaveis.length; e++) {
            this.headersMatrizX.push({
              text: "(" + this.dsVariaveis[e].index + ") " + this.dsVariaveis[e].nome,
              align: "start",
              sortable: false,
              value: this.dsVariaveis[e].index,
            }
            )
          }



          for (let i = 0; i < variaveisEstruct.length; i++) {
            for (let e = 0; e < variaveis.length; e++) {
              variaveisEstruct[i][this.dsVariaveis[e].index] = variaveis[e][i];
            }
            for (let e = 0; e < this.dsResposta.length; e++) {
              variaveisEstruct[i]["resposta" + this.dsResposta[e].index] = 0;
            }
          }
          for (let e = 0; e < this.dsResposta.length; e++) {
            this.headersMatrizX.push({
              text: "resposta " + this.dsResposta[e].index,
              align: "start",
              sortable: false,
              value: "resposta" + this.dsResposta[e].index,
            }
            )
            this.dsResposta[e].attributeName = `resposta` + this.dsResposta[e].index
            this.dsResposta[e].attributeName3 = `item.resposta` + this.dsResposta[e].index
          }
          this.dsMatrix = variaveisEstruct;
        });
    },
    mudarVariavel() {
      // if (this.dsTesteT !== null && this.dsTesteT !== undefined && this.dsTesteT != []) {
      //   this.dssTesteT[this.selectAnterior.index]= this.dsTesteT; 
      // }
      this.dsTesteT = this.dssTesteT[this.select.index];
      this.headersTesteT = this.headerssTesteT[this.select.index];
      this.dsTabAnova = this.dssTabAnova[this.select.index];
      this.selectAnterior = this.select
      this.updateChat()
    },
    voltar() {
      if (this.tela > 1) {
        this.tela--;
      }
    },
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    },
    check(prop) {
      console.log(prop)
    },
    toName(prop) {
      let x = ""
      prop.forEach(element => {
        x += "X" + element + " "
      });
      return x
    },
    updateChat() {
      const config = {}
      const math = create(all, config)

      const element = this.dsResposta[parseInt(this.select.index) - 1];

      let matrisY = this.dsMatrix.map(v => [v[element.attributeName]]);
      //let matrisY = [[1.0],[2.0],[3.0],[4.0],[5.1],[5.0]];
      let matrisY_ = math.multiply(math.transpose(this.MatrixDecode), this.dsTesteT.map(x => [x.B]))

      this.opitionChart1.series[0].data = math.concat(matrisY, matrisY_)
      let max = math.max([...matrisY, ...matrisY_].map(x => x[0]))
      if (max == 0 || max == NaN || max == undefined) {
        max = 1;
      } else {
        max = max * 1.1;
      }
      this.opitionChart1.series[1].data = [[0, 0], [max, max]]

      console.log("this.regressaoChat", this.regressaoChat)
      console.log("this.regressaoChat2", this.regressaoChat2)
      this.regressaoChat.update(this.opitionChart1);

      this.opitionChart2.xAxis.categories = this.dsTesteT.map(x => x.X == 0 ? "media" : this.toName(x.X))
      // this.opitionChart2.series[0].data = this.dsTesteT.map(x => [parseFloat(x["p-valor"])])
      // this.opitionChart2.series[1].data = this.dsTesteT.map(x => [parseFloat(x["t[(B - H0)/er]"])])

      this.opitionChart2.series[0].data = this.dsTesteT.map(x => [parseFloat(x["t Crítico"])])
      this.opitionChart2.series[1].data = this.dsTesteT.map(x => [parseFloat(x["B"])])
      //this.regressaoChat2 = Highcharts.chart('container2',  this.opitionChart2)
      this.regressaoChat2.update(this.opitionChart2);


      let data = {
        x: [],
        y: [],
        z: [],
        type: "mesh3d",
        intensity: [],
        colorscale: [
          [0, '#FAE800'],
          [0.5, '#EB8C00'],
          [1, '#F52102']
        ]
        // contours: {
        //   z: {
        //     show: true,
        //     usecolormap: true,
        //     highlightcolor: "#42f462",
        //     project: { z: true }
        //   }
        // }
      }
      //calculando valores do grafico
      let k = 20;

      for (let i = 0; i <= k; i++) {
        let auxi = -1 + (2 / k) * i
        for (let e = 0; e <= k; e++) {
          let auxe = -1 + (2 / k) * e
          data.x.push(auxi);
          data.y.push(auxe);
          data.z.push(this.regrecaoFunction([auxi, auxe]));
          //data3d[i][e] = [auxi, auxe, this.regrecaoFunction([auxi, auxe])]
        }
      }
      
      Plotly.purge('myDiv');
      this.dataSurface[0] = data;
      
      //Plotly.restyle()
      data.intensity = data.z
      Plotly.newPlot('myDiv', [data], this.layoutSurface);
      console.log([data])
      console.log(document.getElementById("myDiv"))


    },
    regrecaoFunction(Xs) {
      let Y = 0;
      this.dsTesteT.map(x => {
        let aux = 1;
        x.X.map(x => {
          if (x != 0) {
            aux *= Xs[x - 1]
          }
        })
        aux *= x.B;
        Y += aux;
      }
      )
      return Y
    }
  },
  mounted() {
    pareto(Highcharts);
    exportData(Highcharts);
    exporting(Highcharts);
    accessibility(Highcharts);
    
    Plotly.newPlot('myDiv', this.dataSurface, this.layoutSurface);

    this.regressaoChat = Highcharts.chart('container1', this.opitionChart1)
    this.regressaoChat2 = Highcharts.chart('container2', this.opitionChart2)
    Highcharts.setOptions({
      colors: Highcharts.getOptions().colors.map(function (color) {
        return {
          radialGradient: {
            cx: 0.4,
            cy: 0.3,
            r: 0.5
          },
          stops: [
            [0, color],
            [1, Highcharts.color(color).brighten(-0.2).get('rgb')]
          ]
        };
      })
    });




  },
  watch: {
    Nvariaveis() {

      if (this.dsVariaveis.length == this.Nvariaveis) {
        return;
      } else if (this.dsVariaveis.length > this.Nvariaveis) {
        while (this.dsVariaveis.length != this.Nvariaveis) {
          this.dsVariaveis.splice(this.dsVariaveis.length - 1, 1);
        }
      } else if (this.dsVariaveis.length < this.Nvariaveis) {

        while (this.dsVariaveis.length != this.Nvariaveis) {
          this.dsVariaveis.push({
            nome: "",
            index: "" + (this.dsVariaveis.length + 1),
            unidade: " ",
            vBaixo: -1.0,
            vAlto: 1.0,
          });
        }
      }
    },
    NRespostas() {

      if (this.dsResposta.length == this.NRespostas) {
        return;
      } else if (this.dsResposta.length > this.NRespostas) {
        while (this.dsResposta.length != this.NRespostas) {
          this.dsResposta.splice(this.dsResposta.length - 1, 1);
        }
      } else if (this.dsResposta.length < this.NRespostas) {

        while (this.dsResposta.length != this.NRespostas) {
          this.dsResposta.push({
            nome: "_",
            index: "" + (this.dsResposta.length + 1),
            unidade: "_",

          });
        }
      }

    },

  },
};
</script>
