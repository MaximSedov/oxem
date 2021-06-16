<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
      <div style="text-align:left">
        Список пользователей
        <br />
        <br />
        <el-button plain @click.prevent="showSmallTable" :disabled="disableButton">Маленькая</el-button>
        <el-button plain @click="showLargeTable" :disabled="disableButton">Большая</el-button>
        <el-button plain @click="showAddRowForm = !showAddRowForm" v-if="info.length > 0">
          <i v-if="showAddRowForm == false" class="el-icon-plus"></i>
          <i v-else class="el-icon-close"></i>
        </el-button>
      </div>

      <el-row>
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <div v-if="showAddRowForm == true" class="addNewBlock" style="text-align:left;">
            <el-divider></el-divider>
            <el-form :rules="rules" ref="addNewRowForm" :model="addNewRowForm" label-width="100px" label-position="top">
              <el-form-item>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <el-form-item label="id" prop="id">
                      <el-input-number v-model="addNewRowForm.id" style="width:100%"></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="0" :sm="0" :md="1" :lg="1" :xl="1"></el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <el-form-item label="firstName" prop="firstName">
                      <el-input v-model="addNewRowForm.firstName" mask="S"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="0" :sm="0" :md="1" :lg="1" :xl="1"></el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <el-form-item label="lastName" prop="lastName" mask="S">
                      <el-input v-model="addNewRowForm.lastName"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <el-form-item label="email" prop="email">
                      <el-input v-model="addNewRowForm.email" type="email"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="0" :sm="0" :md="1" :lg="1" :xl="1"></el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <el-form-item label="phone" prop="phone">
                      <el-input v-model="addNewRowForm.phone" v-mask="'(###)###-####'"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="0" :sm="0" :md="1" :lg="1" :xl="1"></el-col>
                  <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <el-form-item label="zip" prop="zip">
                      <el-input v-model="addNewRowForm.zip" v-mask="'#####'"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <el-form-item label="streetAddress" prop="streetAddress">
                      <el-input v-model="addNewRowForm.streetAddress" type="streetAddress"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="0" :sm="0" :md="1" :lg="1" :xl="1"></el-col>
                  <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                    <el-form-item label="city" prop="city">
                      <el-input v-model="addNewRowForm.city"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="0" :sm="0" :md="1" :lg="1" :xl="1"></el-col>
                  <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                    <el-form-item label="state" prop="state">
                      <el-input v-model="addNewRowForm.state" v-mask="'AA'"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-form-item label="description" prop="description">
                      <el-input type="textarea" v-model="addNewRowForm.description"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="addRow('addNewRowForm')">Создать</el-button>
              </el-form-item>
            </el-form>
            <el-divider></el-divider>
          </div>
        </el-col>
      </el-row>

      <el-table
        v-if="largeTable == true || smallTable == true"
        ref="singleTable"
        :data="pagedTableData.filter(data => !search || data.firstName.toLowerCase().includes(search.toLowerCase()) || data.lastName.toLowerCase().includes(search.toLowerCase()) || data.email.toLowerCase().includes(search.toLowerCase()) || data.phone.toLowerCase().includes(search.toLowerCase()))"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column sortable property="id" label="id" width="120"></el-table-column>
        <el-table-column sortable property="firstName" label="firstName" width="120"></el-table-column>
        <el-table-column sortable property="lastName" label="lastName" width="120"></el-table-column>
        <el-table-column property="email" label="email"></el-table-column>
        <el-table-column property="phone" label="phone"></el-table-column>
        <el-table-column align="right">
          <template #header>
            <el-input v-model="search" size="mini" placeholder="Type to search" />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 1rem"
        v-if="loading == false"
        background
        layout="prev, pager, next"
        :page-count="info.length / pageSize"
        @current-change="setPage"
      ></el-pagination>
    </el-col>
    <el-col :xs="0" :sm="0" :md="1" :lg="1" :xl="1"></el-col>
    <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
      <div class="rowResult" style="text-align:left; position: sticky; top:1rem" v-if="currentRow.length != 0">
        <el-tag>Пользователь:</el-tag>
        <b>{{currentRow.firstName + ' ' + currentRow.lastName}}</b>
        <br />
        <el-tag>Описание:</el-tag>
        <el-input type="textarea" disabled :value="currentRow.description"></el-input>
        <el-tag>Почта:</el-tag>
        <b>{{currentRow.email}}</b>
        <br />
        <el-tag>Телефон:</el-tag>
        <b>{{currentRow.phone}}</b>
        <br />
        <el-tag>Адрес проживания:</el-tag>
        <b>{{currentRow.address.streetAddress}}</b>
        <br />
        <el-tag>Город:</el-tag>
        <b>{{currentRow.address.city}}</b>
        <br />
        <el-tag>Провинция/штат:</el-tag>
        <b>{{currentRow.address.state}}</b>
        <br />
        <el-tag>Индекс:</el-tag>
        <b>{{currentRow.address.zip}}</b>
        <br />
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      info: [],
      currentRow: [],
      loading: true,
      page: 1,
      pageSize: 50,
      largeTable: false,
      smallTable: false,
      disableButton: false,
      addNewRowForm: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        id: 1,
        streetAddress: "",
        city: "",
        state: "",
        zip: "",
        description: ""
      },
      search: "",
      rules: {
        id: [{ required: true, message: "Please input id", trigger: "blur" }],
        firstName: [
          { required: true, message: "Please input firstname", trigger: "blur" }
        ],
        lastName: [
          { required: true, message: "Please input lastname", trigger: "blur" }
        ],
        email: [
          { required: true, message: "Please input email", trigger: "blur" },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"]
          }
        ],
        streetAddress: [
          {
            required: true,
            message: "Please input streetAddress",
            trigger: "blur"
          }
        ],
        city: [
          { required: true, message: "Please input city", trigger: "blur" }
        ],
        state: [
          { required: true, message: "Please input state", trigger: "blur" },
          { min: 2, max: 2, message: "Length should be 2", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "Please input phone", trigger: "blur" },
          { min: 13, max: 13, message: "Length should be 10", trigger: "blur" }
        ],
        zip: [
          { required: true, message: "Please input zip", trigger: "blur" },
          { min: 5, max: 5, message: "Length should be 5", trigger: "blur" }
        ],
        description: [
          {
            required: true,
            message: "Please input description",
            trigger: "blur"
          }
        ]
      },
      showAddRowForm: false
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    setPage(val) {
      this.page = val;
    },
    addRow(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.pagedTableData.unshift({
            id: this.addNewRowForm.id,
            firstName: this.addNewRowForm.firstName,
            lastName: this.addNewRowForm.lastName,
            email: this.addNewRowForm.email,
            phone: this.addNewRowForm.phone,
            description: this.addNewRowForm.description,
            address: {
              streetAddress: this.addNewRowForm.streetAddress,
              city: this.addNewRowForm.city,
              state: this.addNewRowForm.state,
              zip: this.addNewRowForm.zip
            }
          });
          console.log(this.pagedTableData);
          this.$notify.success({
            title: "Успешно",
            message: "Новая запись успешно добавлена!"
          });
          this.showAddRowForm = false;
          this.$refs[formName].resetFields();
        } else {
          return false;
        }
      });
    },
    showLargeTable() {
      this.disableButton = true;
      this.currentRow = [];
      this.showAddRowForm = false;
      this.loading = true;
      this.info = [];
      this.largeTable = true;
      this.smallTable = false;
      this.axios
        .get(
          "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
        )
        .then(response => {
          console.log(response.data),
            (this.info = response.data.sort((a, b) => (a.id > b.id ? 1 : -1)));
        })
        .catch(error => {
          this.$notify.error({
            title: "Ошибка",
            message: error
          });
        })
        .finally(() => ((this.loading = false), (this.disableButton = false)));
    },
    showSmallTable() {
      this.disableButton = true;
      this.currentRow = [];
      this.showAddRowForm = false;
      this.loading = true;
      this.info = [];
      this.smallTable = true;
      this.largeTable = false;
      this.axios
        .get(
          "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
        )
        .then(response => {
          console.log(response.data),
            (this.info = response.data.sort((a, b) => (a.id > b.id ? 1 : -1)));
        })
        .catch(error => {
          this.$notify.error({
            title: "Ошибка",
            message: error
          });
        })
        .finally(() => ((this.loading = false), (this.disableButton = false)));
    }
  },
  computed: {
    pagedTableData() {
      return this.info.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page
      );
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 1rem;
}
.rowResult {
  .el-tag {
    margin-bottom: 1rem;
    margin-right: 1rem;
  }
  textarea {
    margin-bottom: 1rem;
  }
}
</style>
