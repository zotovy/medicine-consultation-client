import React from "react";
import { Title } from "../../../auth/components/title";

type Props = {
    summa: number,
}

const PayTitle: React.FC<Props> = ({ summa }) => {

    const style = {
        fontSize: "28px",
    }

    return <Title>
        {summa}
        <p style={style}><sup>₽</sup></p>
    </Title>
}

export default PayTitle;