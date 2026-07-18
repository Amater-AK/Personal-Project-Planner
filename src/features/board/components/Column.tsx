import { BsPlus } from "react-icons/bs";

import { ColumnHeader } from "./ColumnHeader";
import { Button } from "@/shared/components/ui/Button";

import { type Column } from "@/shared/types/column.type";

interface Props {
    column: Column;
}

export function Column({ column }: Props) {
    return (
        <article className="flex flex-col gap-4 w-80 p-2 bg-surface-primary border border-border rounded-medium">
            <ColumnHeader column={column} />
            <div className="scrollbar grow overflow-y-auto">
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque perspiciatis quam odit deserunt
                    nisi iusto nemo, qui odio assumenda eos officiis sapiente obcaecati, atque eius voluptates ut
                    consequatur maxime porro ipsa similique eveniet suscipit incidunt inventore labore. Facilis ipsum
                    cumque repudiandae obcaecati et nobis, enim illum temporibus? Eos modi deserunt animi nam est quod
                    qui incidunt provident assumenda? Quo ipsum magnam, sequi dolorum officiis totam accusantium
                    voluptatibus. Aut asperiores vitae facilis a fugiat eligendi nihil hic quis veritatis, dolorum
                    corrupti non perferendis tenetur voluptatibus libero consequuntur quod suscipit. Illum natus dolore
                    soluta aliquam id veritatis dolorum nam ab corrupti quae.
                </p>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque perspiciatis quam odit deserunt
                    nisi iusto nemo, qui odio assumenda eos officiis sapiente obcaecati, atque eius voluptates ut
                    consequatur maxime porro ipsa similique eveniet suscipit incidunt inventore labore. Facilis ipsum
                    cumque repudiandae obcaecati et nobis, enim illum temporibus? Eos modi deserunt animi nam est quod
                    qui incidunt provident assumenda? Quo ipsum magnam, sequi dolorum officiis totam accusantium
                    voluptatibus. Aut asperiores vitae facilis a fugiat eligendi nihil hic quis veritatis, dolorum
                    corrupti non perferendis tenetur voluptatibus libero consequuntur quod suscipit. Illum natus dolore
                    soluta aliquam id veritatis dolorum nam ab corrupti quae.
                </p>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque perspiciatis quam odit deserunt
                    nisi iusto nemo, qui odio assumenda eos officiis sapiente obcaecati, atque eius voluptates ut
                    consequatur maxime porro ipsa similique eveniet suscipit incidunt inventore labore. Facilis ipsum
                    cumque repudiandae obcaecati et nobis, enim illum temporibus? Eos modi deserunt animi nam est quod
                    qui incidunt provident assumenda? Quo ipsum magnam, sequi dolorum officiis totam accusantium
                    voluptatibus. Aut asperiores vitae facilis a fugiat eligendi nihil hic quis veritatis, dolorum
                    corrupti non perferendis tenetur voluptatibus libero consequuntur quod suscipit. Illum natus dolore
                    soluta aliquam id veritatis dolorum nam ab corrupti quae.
                </p>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque perspiciatis quam odit deserunt
                    nisi iusto nemo, qui odio assumenda eos officiis sapiente obcaecati, atque eius voluptates ut
                    consequatur maxime porro ipsa similique eveniet suscipit incidunt inventore labore. Facilis ipsum
                    cumque repudiandae obcaecati et nobis, enim illum temporibus? Eos modi deserunt animi nam est quod
                    qui incidunt provident assumenda? Quo ipsum magnam, sequi dolorum officiis totam accusantium
                    voluptatibus. Aut asperiores vitae facilis a fugiat eligendi nihil hic quis veritatis, dolorum
                    corrupti non perferendis tenetur voluptatibus libero consequuntur quod suscipit. Illum natus dolore
                    soluta aliquam id veritatis dolorum nam ab corrupti quae.
                </p>
            </div>
            <footer>
                <Button intent="regular" width="full">
                    <BsPlus />
                    <span>Add a card</span>
                </Button>
            </footer>
        </article>
    );
}
