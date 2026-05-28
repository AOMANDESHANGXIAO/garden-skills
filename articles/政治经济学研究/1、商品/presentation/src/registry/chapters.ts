import type { ChapterDef } from "./types";
import Coldopen from "../chapters/01-coldopen/Coldopen";
import { narrations as coldopenNarrations } from "../chapters/01-coldopen/narrations";
import UseValue from "../chapters/02-use-value/UseValue";
import { narrations as useValueNarrations } from "../chapters/02-use-value/narrations";
import WhyExchange from "../chapters/03-why-exchange/WhyExchange";
import { narrations as whyExchangeNarrations } from "../chapters/03-why-exchange/narrations";
import LaborDuality from "../chapters/04-labor-duality/LaborDuality";
import { narrations as laborDualityNarrations } from "../chapters/04-labor-duality/narrations";
import ValueQuantity from "../chapters/05-value-quantity/ValueQuantity";
import { narrations as valueQuantityNarrations } from "../chapters/05-value-quantity/narrations";
import ValueContradiction from "../chapters/06-value-contradiction/ValueContradiction";
import { narrations as valueContradictionNarrations } from "../chapters/06-value-contradiction/narrations";
import CapitalistCrisis from "../chapters/07-capitalist-crisis/CapitalistCrisis";
import { narrations as capitalistCrisisNarrations } from "../chapters/07-capitalist-crisis/narrations";
import Conclusion from "../chapters/08-conclusion/Conclusion";
import { narrations as conclusionNarrations } from "../chapters/08-conclusion/narrations";

export const CHAPTERS: ChapterDef[] = [
  {
    id: "coldopen",
    title: "开场钩子",
    narrations: coldopenNarrations,
    Component: Coldopen,
  },
  {
    id: "use-value",
    title: "使用价值及其历史性",
    narrations: useValueNarrations,
    Component: UseValue,
  },
  {
    id: "why-exchange",
    title: "为什么能交换",
    narrations: whyExchangeNarrations,
    Component: WhyExchange,
  },
  {
    id: "labor-duality",
    title: "劳动二重性",
    narrations: laborDualityNarrations,
    Component: LaborDuality,
  },
  {
    id: "value-quantity",
    title: "价值如何量化",
    narrations: valueQuantityNarrations,
    Component: ValueQuantity,
  },
  {
    id: "value-contradiction",
    title: "使用价值与价值的矛盾",
    narrations: valueContradictionNarrations,
    Component: ValueContradiction,
  },
  {
    id: "capitalist-crisis",
    title: "从内部矛盾到生产过剩危机",
    narrations: capitalistCrisisNarrations,
    Component: CapitalistCrisis,
  },
  {
    id: "conclusion",
    title: "商品的本质：社会关系",
    narrations: conclusionNarrations,
    Component: Conclusion,
  },
];
