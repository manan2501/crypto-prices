import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useParams } from "react-router-dom";

const CoinDetail = () => {
        const { coinName } = useParams();
        const [data, setData] = useState([]);
        data.map((item) => {});
        const priceData = {
                labels: data.map((item) => {
                        const dateISO = Date.parse(item.datetime);
                        let date = new Date(dateISO);
                        let time =
                                date.getHours() > 12
                                        ? `${
                                                  date.getHours() - 12
                                          }:${date.getMinutes()} PM`
                                        : `${date.getHours()}:${date.getMinutes()} AM`;
                        return time;
                }),
                datasets: [
                        {
                                label: coinName,
                                data: data.map((item) => item.price),
                                fill: true,
                                backgroundColor: "rgba(75,200,100,0.2)",
                                borderColor: "rgba(75,200,100,1)",
                        },
                ],
        };

        // Send initial request
        useEffect(() => {
                axios.get(
                        "https://supermind-staging.vercel.app/api/test/graph"
                ).then((res) => {
                        setData(res.data);
                });
        }, []);
        // Send request every 60 sec
        useEffect(() => {
                let interval = setInterval(() => {
                        axios.get(
                                "https://supermind-staging.vercel.app/api/test/graph"
                        ).then((res) => {
                                setData(res.data);
                        });
                }, 60000);
                return () => {
                        clearInterval(interval);
                };
        }, []);
        useEffect(() => {
                console.log("Data updated: ", data);
        }, [data]);

        return (
                <div>
                        <Line
                                data={priceData}
                                options={{
                                        elements: {
                                                point: {
                                                        radius: 1,
                                                },
                                        },
                                }}
                        />
                </div>
        );
};

export default CoinDetail;
