import { NextPage } from "next";
import HomeLayout from "../layouts/home.layout";
import NestedLayout from "../layouts/defautlt.layout";

type PageWithMainLayoutType = NextPage & { layout: typeof HomeLayout };

type PageWithPostLayoutType = NextPage & { layout: typeof NestedLayout };

type PageWithLayoutType = PageWithMainLayoutType | PageWithPostLayoutType;

export default PageWithLayoutType;
