<template>
  <v-stepper v-model="tela">
    <v-stepper-header>
      <v-stepper-step :complete="tela > 1" step="1">
        Variaveis
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="tela > 2" step="2">
        Respostas
      </v-stepper-step>

      <v-divider></v-divider>
      <v-stepper-step :complete="tela > 3" step="3">
        resultados
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="tela > 4" step="4"> Teste T </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="tela > 5" step="5"> Tabela de Anova </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <!-- variaveis -->
      <v-stepper-content step="2">
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
                  <div class="mt-4 text-h6">Atualizar valor baixo</div>
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
                  <div class="mt-4 text-h6">Atualizar valor alto</div>
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
      <!-- respostas -->
      <v-stepper-content step="1">
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
              <v-edit-dialog :return-value="props.item.nome" large persistent @save="save" @cancel="cancel"
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
          
            <template v-for="resposta in dsResposta"  v-slot:[resposta.attributeName3]="props">
              <v-edit-dialog 
                :key="resposta.index" 
                :return-value.sync="props.item[resposta.attributeName]" 
                large 
                persistent 
                @save="save" 
                @cancel="cancel"
                @open="open" 
                @close="close">
                <div>{{ props.item[resposta.attributeName] }}</div>
                <template v-slot:input>
                  <div class="mt-4 text-h6">atualizar resposta</div>
                  <v-text-field v-model.number="props.item[resposta.attributeName]" label="Edit" single-line counter autofocus>
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
          <v-select
            v-model="select"
            :items="dsResposta"
            item-text="index"
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
          </v-select>
        
        <v-data-table :headers="headersTesteT" :items="dsTesteT" disable-pagination :hide-default-footer="true">
          <template v-slot:[`item.resposta`]="props">

            <v-checkbox v-model="props.resposta"></v-checkbox>
          </template>
        </v-data-table>

        <v-btn text> Cancelar </v-btn>

        <v-btn @click="voltar"> Voltar </v-btn>
        <v-btn color="primary" @click="avancar"> Continuar </v-btn>
      </v-stepper-content>
      <!-- TabAnova -->
      <v-stepper-content step="5">
        <v-card class="mb-12"></v-card>
        <v-data-table :headers="headersTabAnova" :items="dsTabAnova" disable-pagination :hide-default-footer="true">
        </v-data-table>
        <!-- <span>Y = <span v-for="(item, index) in dsTesteT" >{{item.be}}</span></span> -->
        <v-btn @click="voltar"> Voltar </v-btn>
        <v-btn color="primary" @click="avancar"> Continuar </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
  import axios from "axios";
export default {
  // https://codepen.io/duq/pen/PegPrJ
  // https://thewebdev.info/2020/08/15/vuetify%E2%80%8A-%E2%80%8Aedit-table-content/
  // https://www.codegrepper.com/code-examples/whatever/vuetify+editable+table
  // https://www.codeply.com/p/CMcTQVlHvp/vuetify-editable-datatable
  name: "DCC",

  data: () => ({

    url:'https://apiplanex.herokuapp.com',//heroku
    //url:'http://127.0.0.1:5000',//local
    NReplicadas: 2,
    NRespostas:2,
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
        text: "-1",
        align: "start",
        sortable: false,
        value: "vBaixo",
      },
      {
        text: "+1",
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
    headersMatrizX: [],
    headersTesteT: [],
    headerssTesteT: [],
    headersTabAnova:[],
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
    select:{
          "nome": "selecione uma resposta",
          "index": "0",
          "unidade": " "
      }
        ,
    dsMatrix: [],
    dsTesteT:[],
    dssTesteT:[],
    dsTabAnova:[],
    max25chars: (v) => v.length <= 25 || "nome muito longo !",
  }),
  
  methods: {
    numberRule: (val) => {
      if (val < 0) return "insira um valor positivo ";
      return true;
    },
    avancar() {
      switch (this.tela) {
        case 2:
          this.definirMatx();
          console.log(this);
          break;

        case 3:{

          for (let index = 0; index < this.dsResposta.length; index++) {
            const element = this.dsResposta[index];
            let matrisY = [];
            matrisY[element.index] = this.dsMatrix.map(v => [v[element.attributeName]]);

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
                  f["t[(B - H0)/er]"] = f["t[(B - H0)/er]"] == null ? 0 : f["t[(B - H0)/er]"].toFixed(6);
                  f["p-valor"] = f["p-valor"] == null ? 0 : f["p-valor"].toFixed(6);
                })

              })

          }

          this.select = this.dsResposta[0];
          this.dsTesteT = this.dssTesteT[this.select.index];
          this.headersTesteT = this.headerssTesteT[this.select.index];
          console.log("dssTesteT:",this.dssTesteT);
          console.log("this.dsResposta:",this.dsResposta );
        }
          break

        case 4:
          let matrisY = this.dsMatrix.map(v => [v.resposta]);
          
          matrisY = JSON.stringify(matrisY);
          
          let matrisY1 = this.dsTesteT.map(v => [v.resposta == true ? 1:0]);
          matrisY1 = JSON.stringify(matrisY1);
          axios
            .get(this.url+"/tab_anova/"+this.Nvariaveis+"/"+this.NReplicadas+"/"+matrisY+"/"+matrisY1)
            .then(resp => {
              this.dsTabAnova = resp.data.data
              
              this.headersTabAnova = resp.data.schema.fields.map(f => {
                return {
                  text: f.name,
                  align: "start",
                  sortable: false,
                  value: f.name,
                }
              });
            })
          
          break
        default:
          break;
      }

      if (this.tela <= 4) {
        this.tela++;
      }

    },
    definirmarty(){

    },
    definirMatx(){
      axios
        .get(this.url+"/matrix/" + this.Nvariaveis + "/" + this.NReplicadas)
        .then((resp) => {
          let variaveis = resp.data.slice(1, this.Nvariaveis + 1);
          
          let variaveisEstruct = []

          for (let i = 0; i < variaveis[0].length; i++) {
            variaveisEstruct.push(new Object);
          }
            this.headersMatrizX = [];
          for (let e = 0; e < variaveis.length; e++) {
            this.headersMatrizX.push({
                  text:"("+this.dsVariaveis[e].index+") "+ this.dsVariaveis[e].nome,
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
            for(let e = 0; e < this.dsResposta.length; e++){
              variaveisEstruct[i]["resposta"+this.dsResposta[e].index] = 0;
            }
          }
          for(let e = 0; e < this.dsResposta.length; e++){
              this.headersMatrizX.push({
                  text: "resposta Y_"+this.dsResposta[e].index,
                  align: "start",
                  sortable: false,
                  value: "resposta"+this.dsResposta[e].index,
                }
              )
              this.dsResposta[e].attributeName2 = "resposta Y_"+this.dsResposta[e].index
              this.dsResposta[e].attributeName = `resposta`+this.dsResposta[e].index
              this.dsResposta[e].attributeName3 = `item.resposta`+this.dsResposta[e].index
            }
          this.dsMatrix = variaveisEstruct;
        });
    },
    mudarVariavel(){
          this.dsTesteT = this.dssTesteT[this.select.index];
          this.headersTesteT = this.headerssTesteT[this.select.index];
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
  },
  mounted() {	
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
            index:  "" + (this.dsVariaveis.length+1),
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
            index: ""+(this.dsResposta.length+1),
            unidade: "_",
        
          });
        }
      }
      this.dsResposta.map(x => {
        console.log("x:",x)
      })
    },
    // select(){

    // }
  },
};
</script>
