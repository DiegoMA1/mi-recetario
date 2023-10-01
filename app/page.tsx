"use client";
import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { DocumentData, doc, setDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../firebase";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "recipes"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        console.log(data);
        if (data && data.length > 0) {
          setData(data);
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
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Hola&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>Irma&nbsp;</h1>
        <br />
        <h1 className={title()}></h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Esta es tu nueva app de recetas que te facilitara el acceso a cientos
          de recetas que hayas creado. Aun en construccion pero pronto estara
          finalizada.
        </h2>
      </div>
      {data &&
        data.map((recipe) => (
          <div>
            <Card isFooterBlurred radius="lg" className="border-none">
              <Image
                alt="Woman listing to music"
                className="object-cover"
                height={200}
                src={recipe.image}
                width={200}
              />
              <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">{recipe.name}.</p>
                <Button
                  className="text-tiny text-white bg-black/20"
                  variant="flat"
                  color="default"
                  radius="lg"
                  size="sm"
                  onClick={() => router.push(`/receipt-details/${recipe.id}`)}
                >
                  Ver receta
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
    </section>
  );
}
