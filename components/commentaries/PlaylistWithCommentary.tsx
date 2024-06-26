import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  DarkMode,
  Flex,
  Heading,
  HStack,
  Img,
  Link,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PropsOf } from "@emotion/react";
import dynamic from "next/dynamic";
import { TrackWithCommentary } from "./TrackWithCommentary";

const AuthButtons = dynamic(() => import("../auth/AuthButtons"), {
  ssr: false,
});

export const PlaylistWithCommentary = (props: {
  name: string;
  image: string;
  description: string;
  href: string;
  author: {
    name: string;
    image: string;
  };
  tracks: PropsOf<typeof TrackWithCommentary>[];
}) => {
  return (
    <Flex gap="15px" wrap={"wrap"} style={{ height: "100%", padding: "10px" }}>
      <DarkMode>
        <div
          style={{
            //borderColor: "rgb(55,65,81)",
            borderRadius: "8px",
            padding: "15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            maxWidth: "300px",
          }}
        >
          <Box fontSize={"md"}>
            <VStack alignItems={"start"} spacing={"4"}>
              <Img src={props.image} style={{ borderRadius: "25px" }} />
              <VStack alignItems={"start"} spacing={"0"}>
                <Heading
                  size="xs"
                  color={"GrayText"}
                  textTransform={"uppercase"}
                >
                  Playlist with commentary
                </Heading>
                <Heading size="md">
                  <SkeletonText isLoaded={!!props.name}>
                    {props.name}
                  </SkeletonText>
                </Heading>
              </VStack>
              <HStack>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Avatar
                    size="xs"
                    marginRight={"5px"}
                    src={props.author.image}
                  />
                  <SkeletonText isLoaded={!!props.author?.name}>
                    <Text fontWeight={"bold"}>{props.author.name}</Text>
                  </SkeletonText>
                </Flex>
                <div>
                  <SkeletonText isLoaded={!!props.tracks}>
                    {props.tracks?.length} songs
                  </SkeletonText>
                </div>
                <div>36 minutes</div>
              </HStack>
              <SkeletonText isLoaded={!!props.description}>
                <Text maxWidth={"500px"}>{props.description}</Text>
              </SkeletonText>
            </VStack>

            <VStack alignItems={"start"} spacing={"2"} marginTop="15px">
              <Link color="blue.700" fontWeight={"semibold"} href={props.href}>
                <ArrowBackIcon /> View this playlist on Spotify
              </Link>
              <Link
                color="green.900"
                fontWeight={"semibold"}
                href="https://commented.com"
              >
                View {props.author.name}'s Spotify profile
              </Link>
            </VStack>
          </Box>
          <Box marginTop={"20px"}>
            <AuthButtons />
            <Text marginTop={"20px"} fontSize="sm">
              Copyright &copy; 2022 Commented
            </Text>
          </Box>
        </div>
      </DarkMode>
      <Box flexGrow={1}>
        <Heading margin="15px" size="lg">
          {props.author.name}'s commentary
        </Heading>
        <Box
          overflowY={{ lg: "scroll" }}
          maxH={{ lg: "900px" }}
          fontSize={"sm"}
        >
          <table style={{ tableLayout: "fixed" }}>
            <tbody>
              {props.tracks?.map((track) => (
                <TrackWithCommentary key={track.number} {...track} />
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </Flex>
  );
};
