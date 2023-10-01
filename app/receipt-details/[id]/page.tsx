"use client";
import { title } from "@/components/primitives";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { Image } from "@nextui-org/react";

export default function ReceiptDetailsPage(props: any) {
  const params = useParams();
  // Route -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  console.log(params);
  const [receipt, setReceipt] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = await getDoc(doc(db, "recipes", String(params.id)));
        const data = docRef.data();
        console.log(data);
        if (data) {
          setReceipt(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && !receipt && <p>Receipt not found</p>}
      {!loading && receipt && (
        <>
          <h1 className={title()}>{receipt!.name}</h1>
          <Image
            isBlurred
            width={300}
            alt="NextUI Fruit Image with Zoom"
            src={receipt!.image}
          />
        </>
      )}
    </div>
  );
}
