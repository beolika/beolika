import React, { Suspense } from "react";
import { getProductBySlug, getProductDetails, getProductFaqs, getProductLists, getProductsByCategory } from "@/utils/api/api";
import { errorResponse, getRandomProducts } from "@/utils/utils";
import { ProductDetailsDto } from "@/utils/api/dto/productDetailsDto";
import { ProductListsDto } from "@/utils/api/dto/productListsDto";
import { ProductDto } from "@/utils/api/dto/productDto";
import { FaqDto } from "@/utils/api/dto/faqDto";
import ProductDetails from "@/components/Product/ProductDetails";
import ProductHeader from "@/components/Product/ProductHeader";
import Suggestion from "@/components/Product/Suggestion";
import Footer from "@/components/ui/Footer";
import Loading from "./loading";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product: ProductDto = await getProductBySlug(params.slug).catch((err) => {
    errorResponse(err);
  });
  const categoryName = product.attributes.categories.data[0].attributes.name;
  const productLists: ProductListsDto = await getProductLists(product ? categoryName : "").catch((err) => {
    errorResponse(err);
  });
  const productDetails: ProductDetailsDto = await getProductDetails(product ? categoryName : "").catch((err) => {
    errorResponse(err);
  });
  const productFaqs: FaqDto = await getProductFaqs(product ? categoryName : "").catch((err) => {
    errorResponse(err);
  });
  const productByCategory: ProductDto[] = await getProductsByCategory(product ? categoryName : "").catch((err) => {
    errorResponse(err);
  });

  const suggestedProducts = getRandomProducts(productByCategory, params.slug).slice(0, 3);

  return (
    <main>
      <Suspense fallback={<Loading />} >
        <ProductHeader product={product} productLists={productLists} />
        <ProductDetails product={product} productDetails={productDetails} productFaqs={productFaqs} />
        {productByCategory.length > 2 && <Suggestion productSuggest={suggestedProducts} />}
        <Footer />
      </Suspense>
    </main>
  );
}
