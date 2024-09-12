/* eslint-disable react/prop-types */
// MiniStatistics.js
import { Box, Text, Flex, Icon } from "@chakra-ui/react";

const MiniStatistics = ({ startContent, name, value, growth }) => (
  <Box
    p="6"
    bg="white"
    borderRadius="xl"
    shadow="md"
    width="100%"
    display="flex"
    flexDirection="column"
    fontFamily="monospace"
  >
    <Flex mb="4" align="center">
      {startContent}
      <Box ml="3">
        <Text fontSize="lg" fontWeight="bold">
          {name}
        </Text>
        <Text fontSize="xl" fontWeight="bold">
          {value}
        </Text>
        {growth && (
          <Text fontSize="sm" color="green.500">
            {growth}
          </Text>
        )}
      </Box>
    </Flex>
  </Box>
);

export default MiniStatistics;
