import { Box, Flex, Text, Heading, Divider, Input } from "@chakra-ui/react";

const Admin = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        minH: "100vh",
        bgColor: "#E6FFFA",
        display: "flex",
        fontFamily: '"DM Sans", sans-seri',
      }}
      color="#1D4044"
    >
      {/* SIDEBAR */}
      {/* <Box
        sx={{
          display: "block",
          bgColor: "#fff",
          minW: "300px",
        }}
        boxShadow="base"
        p="5"
      >
        <Flex direction="column">
          <Box textAlign="center">
            <Heading
              as="h1"
              size="xl"
              sx={{
                fontWeight: "bold",
                my: "2rem",
              }}
            >
              INPUT
            </Heading>
          </Box>
          <Divider mb="2rem" />
          <Flex direction="column" gap="3">
            <Flex
              px="7"
              sx={{
                textTransform: "capitalize",
                fontSize: "18px",
              }}
            >
              <Text>Input data</Text>
            </Flex>
            <Flex
              px="7"
              sx={{
                textTransform: "capitalize",
                fontSize: "18px",
              }}
            >
              <Text>lihat data</Text>
            </Flex>
          </Flex>
        </Flex>
      </Box> */}
      {/* CONTENT */}
      <Box p="10" w="100%" h="100%">
        {children}
      </Box>
    </Box>
  );
};

export default Admin;
