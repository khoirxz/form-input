import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Flex,
  Select,
  Input,
  Textarea,
  chakra,
  Button,
} from "@chakra-ui/react";

import LayoutAdmin from "../../../layouts/admin";
import { customerSevices } from "../../../CONST";

const InputPembeli = () => {
  const [dropAddress, setDropAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [cancelToken, setCanceToken] = useState(null);
  // data
  const [namaCs, setNamaCs] = useState("");
  const [pembeli, setPembeli] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [detailAlamat, setDetailAlamat] = useState("");
  const [namaProduk, setNamaProduk] = useState("");
  const [totalHarga, setTotalHarga] = useState("");
  const [metodePembayaran, setMetodePembayaran] = useState("");

  useEffect(() => {
    // Cleanup the previous request when the component unmounts
    return () => {
      if (cancelToken) {
        cancelToken.cancel("Request canceled by user");
      }
    };
  }, [cancelToken]);

  const handleAddress = async (value) => {
    setSelectedAddress(value);
    if (value.length <= 3) {
      setAddresses([]);
      return null;
    }

    if (cancelToken) {
      cancelToken.cancel("Request canceled by user");
    }

    const source = axios.CancelToken.source();
    setCanceToken(source);

    try {
      const { data } = await axios.get(
        `https://api-kodepos-puce.vercel.app/search/?q=${value}`,
        { cancelToken: source.token }
      );

      setAddresses(data.data.slice(0, 20));
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled by user");
      } else {
        console.log(error);
      }
    }
  };

  const handleSelected = (provinsi, kota, kecamatan, desa, kodepos) => {
    // console.log(`${provinsi}, ${kota}, ${kecamatan}, ${desa}, ${kodepos}`);
    setSelectedAddress(
      `${provinsi}, ${kota}, ${kecamatan}, ${desa}, ${kodepos}`
    );
    setDropAddress(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "https://sheet.best/api/sheets/622c928a-f7b1-4b14-8d95-8506aa7e5939",
        {
          CS: namaCs,
          NAMA: pembeli,
          NO: noTelp,
          ALAMAT: selectedAddress,
          DETAIL: detailAlamat,
          BARANG: namaProduk,
          TOTAL: totalHarga,
          PEMBAYARAN: metodePembayaran,
        }
      );

      setNamaCs("");
      setPembeli("");
      setNoTelp("");
      setSelectedAddress("");
      setDetailAlamat("");
      setNamaProduk("");
      setTotalHarga("");
      setMetodePembayaran("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <LayoutAdmin>
      <Heading as="h1" mb={6}>
        Input Data
      </Heading>
      <Box
        bgColor="#fff"
        p="3"
        borderRadius="xl"
        as="form"
        onSubmit={handleSubmit}
      >
        <Flex direction="column" gap="4">
          <FormControl>
            <FormLabel>NAMA CS : </FormLabel>
            <Select
              placeholder="Pilih cs"
              onChange={(e) => setNamaCs(e.target.value)}
              value={namaCs}
            >
              {customerSevices.map((item, i) => (
                <option value={item} key={i}>
                  {item}
                </option>
              ))}
            </Select>
          </FormControl>
          {/* NAMA PEMBELI */}
          <FormControl>
            <FormLabel>Nama pembeli</FormLabel>
            <Input
              type="text"
              onChange={(e) => setPembeli(e.target.value)}
              value={pembeli}
            />
          </FormControl>
          {/* END NAMA PEMBELI */}
          {/* NOMOR PEMBELI */}
          <FormControl>
            <FormLabel>NO. TELPON</FormLabel>
            <Input
              type="number"
              onChange={(e) => setNoTelp(e.target.value)}
              value={noTelp}
            />
          </FormControl>
          {/* END NOMOR PEMBELI */}
          {/* ALAMAT */}
          <FormControl>
            <FormLabel>Masukan alamat</FormLabel>
            <Input
              placeholder="masukan kota, kecamatan, kodepos"
              onChange={(e) => handleAddress(e.target.value)}
              onFocus={() => setDropAddress(true)}
              value={selectedAddress}
            />
            {dropAddress && selectedAddress.length >= 3 ? (
              <Box w="100%">
                <Box
                  sx={{
                    position: "absolute",
                    bgColor: "#fff",
                    zIndex: "9",
                    w: "100%",
                    maxH: "200px",
                    overflowY: "auto",
                  }}
                >
                  {addresses.map((item, i) => (
                    <chakra.p
                      sx={{ cursor: "pointer" }}
                      _hover={{
                        color: "#A9A9A9",
                      }}
                      key={i}
                      onClick={() => {
                        handleSelected(
                          item.province,
                          item.city,
                          item.subdistrict,
                          item.urban,
                          item.postalcode
                        );
                      }}
                    >
                      {item.province}, {item.city}, {item.subdistrict},{" "}
                      {item.urban}, {item.postalcode}
                    </chakra.p>
                  ))}
                </Box>
              </Box>
            ) : null}
          </FormControl>
          {/* END ALAMAT */}
          {/* ALAMAT DETAIL */}
          <FormControl>
            <FormLabel>Alamat detail</FormLabel>
            <Textarea
              placeholder="Nama jalan, RT/RW, Patokan"
              onChange={(e) => setDetailAlamat(e.target.value)}
              value={detailAlamat}
            ></Textarea>
          </FormControl>
          {/* END ALAMAT DETAIL */}
          {/* PRODUK */}
          <FormControl>
            <FormLabel>PRODUK</FormLabel>
            <Input
              type="text"
              onChange={(e) => setNamaProduk(e.target.value)}
              value={namaProduk}
            />
          </FormControl>
          {/* END PRODUK */}
          {/* TOTAL */}
          <FormControl>
            <FormLabel>TOTAL</FormLabel>
            <Input
              type="text"
              onChange={(e) => setTotalHarga(e.target.value)}
              value={totalHarga}
            />
          </FormControl>
          {/* END TOTAL */}
          {/* PEMBAYARAN */}
          <FormControl>
            <FormLabel>PEMBAYARAN </FormLabel>
            <Select
              placeholder="METODE PEMBAYARAN"
              onChange={(e) => setMetodePembayaran(e.target.value)}
              value={metodePembayaran}
            >
              <option value="COD">COD</option>
              <option value="TRANSFER">TRANSFER</option>
            </Select>
          </FormControl>
          {/* END PEMBAYARAN */}
          <Button type="submit" colorScheme="teal">
            Submit
          </Button>
        </Flex>
      </Box>
    </LayoutAdmin>
  );
};

export default InputPembeli;
