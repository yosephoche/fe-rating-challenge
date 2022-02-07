import {
  useDisclosure,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import ReactStars from "react-rating-stars-component";
import {
  getDetail,
  submitReview,
  BookDetails,
  ReviewData,
} from "../api/rating";

const defaultReactStarsProps = {
  size: 30,
  color: "#e0e0e0",
  activeColor: "#ffd700",
  emptyIcon: <i className="far fa-star"></i>,
  halfIcon: <i className="fa fa-star-half-alt"></i>,
  fullIcon: <i className="fa fa-star"></i>,
  isHalf: true,
};

interface Rate {
  id: string;
  review: string;
  rate: number;
}

const defaultReview: ReviewData = {
  rate: 0,
  review: "",
};

const Index: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newReview, setNewReview] = React.useState(defaultReview);
  const [detail, setDetail] = React.useState<BookDetails | undefined>();
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchDetail = () => {
    getDetail("1")
      .then((res) => {
        setDetail(res.data);
      })
      .catch(() => {
        alert("Something error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    fetchDetail();
  }, []);

  const handleRatingChange = (rate: number) => {
    setNewReview({ ...newReview, rate });
  };

  const resetFormSubmit = () => {
    setNewReview(defaultReview);
  };

  const handleSubmit = async () => {
    onClose();
    try {
      const res = await submitReview(newReview);
      if (res.status === 200) {
        resetFormSubmit();
        fetchDetail();
      }
    } catch (_error) {
      alert("Something error");
    }
  };

  return (
    <>
      <Container marginY="100px">
        <Heading>{detail?.book.title}</Heading>
        <Flex align="center" paddingY="44px" justify="space-between">
          <Flex align="center">
            {isLoading ? (
              <Box>Loading...</Box>
            ) : (
              <>
                <Box fontSize="44px" marginRight="14px">
                  {detail?.rate}
                </Box>
                <ReactStars
                  value={detail?.rate}
                  count={5}
                  edit={false}
                  {...defaultReactStarsProps}
                />
              </>
            )}
          </Flex>
          <Button variant="outline" onClick={onOpen}>
            Add Review
          </Button>
        </Flex>
        <Box marginTop="10px" borderTop="1px solid" borderColor="gray.300">
          <Heading marginY="30px" fontSize="28px">Reviews</Heading>
          {isLoading ? (
            <Box>Loading...</Box>
          ) : (
            <VStack spacing="30px" align="flex-start">
              {detail?.ratings.map((item, key) => (
                <Flex align="center" key={key}>
                  <ReactStars
                    count={5}
                    value={item.rate}
                    edit={false}
                    {...defaultReactStarsProps}
                  />
                  <Box marginLeft="30px">
                    <b>{item.rate}</b>, {item.review}
                  </Box>
                </Flex>
              ))}
            </VStack>
          )}
        </Box>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading>Whats your rating?</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="14px">
              <FormControl>
                <FormLabel htmlFor="rating">Rating</FormLabel>
                <ReactStars
                  id="rating"
                  count={5}
                  onChange={handleRatingChange}
                  {...defaultReactStarsProps}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="review">Review</FormLabel>
                <Input
                  id="review"
                  name="review"
                  variant="flushed"
                  placeholder="Start typing..."
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      review: e.currentTarget.value,
                    })
                  }
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" variant="outline" onClick={handleSubmit}>
              Submit Review
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Index;
