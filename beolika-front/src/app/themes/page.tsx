import React, { Suspense } from "react";
import Footer from "@/components/ui/Footer";
import Loading from "./loading";
import Collections from "@/components/Collections";
import NavBar from "@/components/ui/NavBar";
import { getAllProducts } from "@/utils/api/api";
import { ProductDto } from "@/utils/api/dto/productDto";

export default async function AllCollections() {
  const allProducts: ProductDto[] = await getAllProducts();

  return (
    <main>
      <div className="container">
        <NavBar />
      </div>
      <Suspense fallback={<Loading />}>
        <Collections data={allProducts} />
        <Footer />
      </Suspense>
    </main>
  );
}
