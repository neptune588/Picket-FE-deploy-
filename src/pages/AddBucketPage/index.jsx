import NavBar from "@/components/NavBar";
import LocationBar from "@/components/LocationBar/LocationBar";

import { Container, ImageUploadWrapper } from "@/pages/AddBucketPage/style";

export default function AddBucketPage() {
  return (
    <>
      <NavBar />
      <LocationBar content={"버킷 추가"} />
      <Container>
        <ImageUploadWrapper></ImageUploadWrapper>
      </Container>
    </>
  );
}
