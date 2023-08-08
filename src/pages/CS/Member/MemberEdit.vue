<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { mapActions, mapMutations, mapState } from "vuex";
import Swal from "sweetalert2";
import { ArrowPathIcon, PencilSquareIcon } from "@heroicons/vue/24/outline";
</script>
<template>
  <main>
    <div class="flex w-full px-4 py-3">
      <h2 class="flex-none text-xl font-semibold font-poppins text-slate-800">
        Member Form
      </h2>
      <a
        href=""
        class="flex self-center justify-end w-full gap-2 text-theme-primary"
      >
        <i class="w-5 h-5 fa-solid fa-rotate"></i>
        <p class="text-sm font-poppins">Reload Data</p>
      </a>
    </div>

    <form @submit.prevent="submit" class="w-full md:mt-2">
      <div class="flex flex-wrap mb-5">
        <!-- Data member -->
        <div class="w-full px-4">
          <div
            class="relative flex flex-col w-full min-w-0 mb-6 break-words border-0 rounded-lg shadow-lg bg-blueGray-100 bg-slate-200"
          >
            <div class="px-6 py-6 mb-0 rounded-t bg-slate-800">
              <div class="flex justify-between text-center">
                <h6 class="text-xl font-semibold text-white">Data member</h6>
              </div>
            </div>

            <div class="flex-auto px-4 py-5 pt-5 rounded-b bg-slate-200">
              <div class="flex flex-wrap">
                <!-- username state -->
                <div class="w-full px-4 mb-5 lg:w-6/12">
                  <div class="relative z-0">
                    <input
                      type="text"
                      id="username"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      v-model="member.username"
                      :disabled="member.username == 'Loading...'"
                    />
                    <label
                      for="username"
                      class="absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >Username Member</label
                    >
                  </div>
                </div>
                <!-- phone state -->
                <div class="w-full px-4 mb-5 lg:w-6/12">
                  <div class="relative z-0">
                    <input
                      type="text"
                      id="password"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      v-model="member.password"
                      :disabled="member.member_name == 'Loading...'"
                    />
                    <label
                      for="password"
                      class="absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >Password Member</label
                    >
                  </div>
                  <p class="mt-1 text-xs text-gray-500" id="file_input_help">
                    kosongkan jika tidak ingin mengisi.
                  </p>
                </div>
                <!-- name state -->
                <div class="w-full px-4 mb-5 lg:w-6/12">
                  <div class="relative z-0">
                    <input
                      type="text"
                      id="member_name"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      v-model="member.member_name"
                      :disabled="member.member_name == 'Loading...'"
                    />
                    <label
                      for="member_name"
                      class="absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >Nama Member</label
                    >
                  </div>
                </div>
                <!-- phone state -->
                <div class="w-full px-4 mb-5 lg:w-6/12">
                  <div class="relative z-0">
                    <input
                      type="text"
                      id="member_phone"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      v-model="member.member_phone"
                      :disabled="member.member_name == 'Loading...'"
                    />
                    <label
                      for="member_phone"
                      class="absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >HP Member</label
                    >
                  </div>
                </div>
                <!-- province state -->
                <div class="w-full px-4 mb-5 lg:w-6/12">
                  <label for="provinsi" class="sr-only">Provinsi</label>
                  <select
                    id="provinsi"
                    class="block py-2.5 px-0 w-full text-sm text-slate-600 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-slate-300 peer"
                    v-model="ongkir.provinsi"
                    @click="setProvinsi($event)"
                    :disabled="member.member_name == 'Loading...'"
                  >
                    <option value="">Pilih Provinsi</option>
                    <option
                      v-for="(provinsi, index) in provinsi"
                      :key="index"
                      :value="provinsi.province_id"
                    >
                      {{ provinsi.province }}
                    </option>
                  </select>
                  <p class="mt-1 text-xs text-gray-500" id="file_input_help">
                    kosongkan jika tidak ingin mengisi.
                  </p>
                </div>
                <!-- city state -->
                <div class="w-full px-4 mb-5 lg:w-6/12">
                  <label for="kota" class="sr-only">Kota</label>
                  <select
                    id="kota"
                    class="block py-2.5 px-0 w-full text-sm text-slate-600 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-slate-300 peer"
                    v-model="ongkir.kota"
                    @click="setKota($event)"
                    :disabled="member.member_name == 'Loading...'"
                  >
                    <option value="">Pilih Kota</option>
                    <option
                      v-for="(kota, index) in kota"
                      :key="index"
                      :value="kota.city_id"
                    >
                      {{ kota.city_name }}
                    </option>
                  </select>
                  <p class="mt-1 text-xs text-gray-500" id="file_input_help">
                    kosongkan jika tidak ingin mengisi.
                  </p>
                </div>
                <!-- district state -->
                <div class="w-full px-4 mb-5 lg:w-6/12">
                  <label for="district_id" class="sr-only">Kecamatan</label>
                  <select
                    id="district_id"
                    class="block py-2.5 px-0 w-full text-sm text-slate-600 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-slate-300 peer"
                    v-model="ongkir.kecamatan"
                    :disabled="member.member_name == 'Loading...'"
                  >
                    <option value="">Pilih Kecamatan</option>
                    <option
                      v-for="(kecamatan, index) in kecamatan"
                      :key="index"
                      :value="kecamatan.subdistrict_id"
                    >
                      {{ kecamatan.subdistrict_name }}
                    </option>
                  </select>
                  <p class="mt-1 text-xs text-gray-500" id="file_input_help">
                    kosongkan jika tidak ingin mengisi.
                  </p>
                </div>
                <!-- alamat state -->
                <div class="w-full px-4 mb-5 lg:w-6/12">
                  <div class="relative z-0">
                    <input
                      type="text"
                      id="member_alamat"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      v-model="member.member_alamat"
                      :disabled="member.member_name == 'Loading...'"
                    />
                    <label
                      for="member_alamat"
                      class="absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >Alamat member</label
                    >
                  </div>
                </div>
                <!-- join on state -->
                <div class="w-full px-4 mb-5 lg:w-6/12">
                  <div class="relative z-0">
                    <input
                      type="date"
                      id="join_on"
                      class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      v-model="member.join_on"
                      :disabled="member.member_name == 'Loading...'"
                    />
                    <label
                      for="join_on"
                      class="absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-300 peer-focus:bg-blue-600 rounded-md dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >Tanggal Join</label
                    >
                  </div>
                </div>
                <!-- type state -->
                <div class="w-full px-4 mb-5 lg:w-6/12">
                  <label for="member_type" class="sr-only">Tipe Member</label>
                  <select
                    id="member_type"
                    class="block py-2.5 px-0 w-full text-sm text-slate-600 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-slate-300 peer"
                    v-model="member.member_type"
                    required
                    :disabled="member.member_name == 'Loading...'"
                  >
                    <option value="">Pilih Tipe Member</option>
                    <option value="1">Agen</option>
                    <option value="0">Reseller</option>
                  </select>
                </div>
                <!-- image state -->
                <div class="flex flex-wrap items-center w-full">
                  <div class="w-full px-4 mb-5 lg:w-6/12">
                    <label
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      for="file_input"
                      >Foto Member</label
                    >
                    <input
                      class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="file_input"
                      type="file"
                      accept="image/*"
                      ref="imageInput"
                      @change="onFileChange"
                      :disabled="member.member_name == 'Loading...'"
                    />
                    <p class="mt-1 text-sm text-gray-500" id="file_input_help">
                      kosongkan jika tidak ingin mengisi.
                    </p>
                  </div>
                  <div class="w-full px-4 mb-5 lg:w-6/12">
                    <label for="member_status" class="sr-only">
                      Status Member
                    </label>
                    <select
                      id="member_status"
                      class="block py-2.5 px-0 w-full text-sm text-slate-600 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-slate-300 peer"
                      v-model="member.member_status"
                      required
                      :disabled="member.member_name == 'Loading...'"
                    >
                      <option value="">Pilih Status</option>
                      <option value="1">Aktif</option>
                      <option value="0">Tidak Aktif</option>
                    </select>
                  </div>
                </div>
                <div
                  class="object-center w-full px-4 mx-auto mb-5"
                  v-if="data.url"
                >
                  <div class="relative">
                    <div class="absolute w-8 h-8 text-red-500 -top-3 -left-3">
                      <button @click="removeImage()" type="button">
                        <i
                          class="w-8 h-8 rounded-full shadow-md fa-solid fa-circle-xmark"
                        ></i>
                      </button>
                    </div>
                  </div>
                  <div
                    class="container max-w-screen-lg mx-auto rounded-lg hero bg-slate-800"
                  >
                    <img
                      :src="data.url"
                      class="object-contain w-48 h-48 mx-auto"
                      alt="Foto Member"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="px-4 lg:w-full">
          <div class="flex-auto px-4 py-3 rounded-lg shadow-lg bg-slate-800">
            <div class="flex justify-between text-center">
              <div
                class="text-white bottom-0 right-0 font-medium rounded-lg text-sm py-2.5 text-center inline-flex items-center mr-2"
              >
                Pastikan Semua Data Benar!!!
              </div>
              <button
                type="submit"
                class="text-white bottom-0 right-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                :class="{ 'cursor-not-allowed': isLoading }"
                :disabled="isLoading"
              >
                <ArrowPathIcon
                  class="w-5 h-5 mr-2 -ml-1 animate-spin"
                  v-if="isLoading"
                />
                <PencilSquareIcon
                  class="w-5 h-5 mr-2 -ml-1"
                  v-if="!isLoading"
                />
                {{ isLoading ? "Loading..." : "Edit Member" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
export default {
  created() {
    this.getProvinsi();
    this.getKota();
    this.getKecamatan();
    this.getMemberEdit(this.$route.params.id).then((res) => {
      this.member = {
        username: res.data.username,
        member_name: res.data.member_name,
        member_phone: res.data.member_phone,
        member_alamat: res.data.member_alamat,
        join_on: res.data.join_on,
        member_type: res.data.member_type,
        image: "",
        member_status: res.data.member_status,
      };

      this.ongkir = {
        provinsi: res.data.province_id,
        kota: res.data.city_id,
        kecamatan: res.data.district_id,
      };
    });
  },
  data() {
    return {
      isLoading: false,
      member: {
        member_name: "Loading...",
        member_phone: "Loading...",
        member_alamat: "Loading...",
        username: "Loading...",
        password: "",
        join_on: "",
        image: "",
        member_type: "",
        member_status: "",
      },
      ongkir: {
        provinsi: "",
        kota: "",
        kecamatan: "",
      },
      data: { url: "" },
    };
  },
  computed: {
    ...mapState("ongkir", {
      provinsi: (state) => state.provinsi,
      kota: (state) => state.kota,
      kecamatan: (state) => state.kecamatan,
    }),
  },
  methods: {
    ...mapActions("ongkir", ["getProvinsi", "getKota", "getKecamatan"]),
    ...mapActions("member", ["updateMember", "getMemberEdit"]),
    ...mapMutations("member", ["SET_ID_UPDATE"]),
    setProvinsi(event) {
      this.getKota(event.target.value);
    },
    setKota(event) {
      this.getKecamatan(event.target.value);
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.data.url = URL.createObjectURL(file);
      this.member.image = file;
    },

    removeImage() {
      this.data.url = null;
      this.member.image = "";
      this.$refs.imageInput.value = null;
    },

    // submit state
    submit() {
      this.isLoading = true;
      var form = new FormData();

      form.append("username", this.member.username);
      form.append("password", this.member.password);
      form.append("member_name", this.member.member_name);
      form.append("member_phone", this.member.member_phone);
      form.append("member_alamat", this.member.member_alamat);
      form.append("image", this.member.image);
      form.append("province_id", this.ongkir.provinsi);
      form.append("city_id", this.ongkir.kota);
      form.append("district_id", this.ongkir.kecamatan);
      form.append("join_on", this.member.join_on);
      form.append("member_type", this.member.member_type);
      form.append("member_status", this.member.member_status);

      this.SET_ID_UPDATE(this.$route.params.id);
      this.updateMember(form)
        .then(() => {
          Swal.fire("Good job!", "You clicked the button!", "success");
          this.isLoading = false;
          this.member = {
            member_name: "",
            member_phone: "",
            member_alamat: "",
            join_on: "",
            image: "",
            member_type: "",
          };

          this.ongkir = {
            provinsi: "",
            kota: "",
            kecamatan: "",
          };
          this.data.url = "";
          this.removeImage;
          this.$router.push({
            name: "member-data",
          });
        })
        .catch(() => {
          // eslint-disable-next-line no-undef
          this.isLoading = false;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        });
    },
  },
};
</script>
