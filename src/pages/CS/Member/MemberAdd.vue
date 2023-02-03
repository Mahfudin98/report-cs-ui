<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { mapActions, mapState } from "vuex";
import Swal from "sweetalert2";
</script>
<template>
  <main>
    <div class="w-full flex py-3 px-4">
      <h2 class="flex-none font-poppins font-semibold text-xl text-slate-800">
        Member Form
      </h2>
      <a
        href=""
        class="w-full flex gap-2 justify-end self-center text-theme-primary"
      >
        <i class="fa-solid fa-rotate w-5 h-5"></i>
        <p class="font-poppins text-sm">Reload Data</p>
      </a>
    </div>

    <form @submit.prevent="submit" class="w-full md:mt-2">
      <div class="flex flex-wrap mb-5">
        <!-- Data member -->
        <div class="w-full px-4">
          <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 bg-slate-200"
          >
            <div class="rounded-t bg-slate-800 mb-0 px-6 py-6">
              <div class="text-center flex justify-between">
                <h6 class="text-white text-xl font-semibold">Data member</h6>
              </div>
            </div>

            <div class="flex-auto px-4 py-5 pt-5 rounded-b bg-slate-200">
              <div class="flex flex-wrap">
                <!-- name state -->
                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <div class="relative z-0">
                    <input
                      type="text"
                      id="member_name"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      v-model="member.member_name"
                    />
                    <label
                      for="member_name"
                      class="absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >Nama Member</label
                    >
                  </div>
                </div>
                <!-- phone state -->
                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <div class="relative z-0">
                    <input
                      type="text"
                      id="member_phone"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      v-model="member.member_phone"
                    />
                    <label
                      for="member_phone"
                      class="absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >HP Member</label
                    >
                  </div>
                </div>
                <!-- province state -->
                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <label for="provinsi" class="sr-only">Provinsi</label>
                  <select
                    id="provinsi"
                    class="block py-2.5 px-0 w-full text-sm text-slate-600 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-slate-300 peer"
                    v-model="ongkir.provinsi"
                    @click="setProvinsi($event)"
                    required
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
                </div>
                <!-- city state -->
                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <label for="kota" class="sr-only">Kota</label>
                  <select
                    id="kota"
                    class="block py-2.5 px-0 w-full text-sm text-slate-600 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-slate-300 peer"
                    v-model="ongkir.kota"
                    @click="setKota($event)"
                    required
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
                </div>
                <!-- district state -->
                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <label for="district_id" class="sr-only">Kecamatan</label>
                  <select
                    id="district_id"
                    class="block py-2.5 px-0 w-full text-sm text-slate-600 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-slate-300 peer"
                    v-model="ongkir.kecamatan"
                    required
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
                </div>
                <!-- alamat state -->
                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <div class="relative z-0">
                    <input
                      type="text"
                      id="member_alamat"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      v-model="member.member_alamat"
                    />
                    <label
                      for="member_alamat"
                      class="absolute text-sm text-slate-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >Alamat member</label
                    >
                  </div>
                </div>
                <!-- join on state -->
                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <div class="relative z-0">
                    <input
                      type="date"
                      id="join_on"
                      class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      v-model="member.join_on"
                    />
                    <label
                      for="join_on"
                      class="absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-slate-300 peer-focus:bg-blue-600 rounded-md dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >Tanggal Join</label
                    >
                  </div>
                </div>
                <!-- type state -->
                <div class="w-full lg:w-6/12 px-4 mb-5">
                  <label for="member_type" class="sr-only">Tipe Member</label>
                  <select
                    id="member_type"
                    class="block py-2.5 px-0 w-full text-sm text-slate-600 bg-transparent border-0 border-b-2 border-slate-300 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-slate-300 peer"
                    v-model="member.member_type"
                    required
                  >
                    <option value="">Pilih Tipe Member</option>
                    <option value="1">Agen</option>
                    <option value="0">Reseller</option>
                  </select>
                </div>
                <!-- image state -->
                <div class="w-full px-4 mb-5">
                  <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    for="file_input"
                    >Foto Member</label
                  >
                  <input
                    class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    type="file"
                    accept="image/*"
                    ref="imageInput"
                    @change="onFileChange"
                  />
                  <p class="mt-1 text-sm text-gray-500" id="file_input_help">
                    kosongkan jika tidak ingin mengisi.
                  </p>
                </div>
                <div
                  class="w-full px-4 mx-auto mb-5 object-center"
                  v-if="data.url"
                >
                  <div class="relative">
                    <div class="absolute -top-3 -left-3 h-8 w-8 text-red-500">
                      <button @click="removeImage()" type="button">
                        <i
                          class="fa-solid fa-circle-xmark h-8 w-8 rounded-full shadow-md"
                        ></i>
                      </button>
                    </div>
                  </div>
                  <div
                    class="hero bg-slate-800 rounded-lg container max-w-screen-lg mx-auto"
                  >
                    <img
                      :src="data.url"
                      class="object-contain mx-auto h-48 w-48"
                      alt="Bukti Transfer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="px-4 lg:w-full">
          <div class="bg-slate-800 flex-auto px-4 py-3 shadow-lg rounded-lg">
            <div class="text-center flex justify-between">
              <div
                class="text-white bottom-0 right-0 font-medium rounded-lg text-sm py-2.5 text-center inline-flex items-center mr-2"
              >
                Pastikan Semua Data Benar!!!
              </div>
              <button
                type="submit"
                class="text-white bottom-0 right-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <i class="fa-solid fa-circle-plus mr-2 -ml-1 w-5 h-5"></i>
                Add Member
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
  },
  data() {
    return {
      member: {
        member_name: "",
        member_phone: "",
        member_alamat: "",
        join_on: "",
        image: "",
        member_type: "",
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
    ...mapActions("member", ["submitMember"]),
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
      var form = new FormData();

      form.append("member_name", this.member.member_name);
      form.append("member_phone", this.member.member_phone);
      form.append("member_alamat", this.member.member_alamat);
      form.append("image", this.member.image);
      form.append("province_id", this.ongkir.provinsi);
      form.append("city_id", this.ongkir.kota);
      form.append("district_id", this.ongkir.kecamatan);
      form.append("join_on", this.member.join_on);
      form.append("member_type", this.member.member_type);

      this.submitMember(form)
        .then(() => {
          Swal.fire("Good job!", "You clicked the button!", "success");
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
