import * as React from "react";
import { Plate } from "./kit/react/draw";
import { PressArt } from "./art";
import { PressLive } from "./live";
import "./kit/iso.css";

interface FigureProps {
  progress?: number;
}

export function ScrewPressFigure({ progress }: FigureProps) {
  return (
    <Plate
      fig="شکل ۱"
      title="مکانیسم تبدیل کاتالوگ سنتی به تعاملی رخنما"
      hint="اسکرول یا نوار لغزنده زیر برای مشاهده مراحل"
      readout="رُخنما · کاتالوگ سازمانی B2B"
      keys={[
        { mark: "raised", label: "پرس اهرمی و پیچ راهنما" },
        { mark: "lit", label: "۴ ماژول داده دیجیتال" },
        { mark: "red", label: "مهر باطل شد روی کاغذهای سنتی" },
        { mark: "flat", label: "شاسی کاتالوگ تعاملی" },
      ]}
      caption="فرآیند تبدیل اسناد کاغذی و کاتالوگ‌های چاپی، اکسل و پیش‌فاکتورهای پراکنده به ماژول‌های داده تعاملی، ساختاریافته و آنلاین در پلتفرم رخنما."
    >
      <PressLive progress={progress}>
        <PressArt />
      </PressLive>
    </Plate>
  );
}
