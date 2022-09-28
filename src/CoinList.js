import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

let PageSize = 10;

const CoinList = () => {
        const [coins, setCoins] = useState([]);
        const [tags, setTags] = useState([]);
        const [currentTag, setCurrentTag] = useState("");
        const [currentCoins, setCurrentCoins] = useState(coins);

        const [currentPage, setCurrentPage] = useState(1);
        const currentTableData = useMemo(() => {
                const firstPageIndex = (currentPage - 1) * PageSize;
                const lastPageIndex = firstPageIndex + PageSize;
                return currentCoins.slice(firstPageIndex, lastPageIndex);
        }, [currentPage, currentCoins]);
        useEffect(() => {
                axios.get(
                        "https://supermind-staging.vercel.app/api/test/listing"
                ).then((res) => {
                        setCoins(res.data);
                });
        }, []);
        useEffect(() => {
                if (coins.length) {
                        // Extract all the tags
                        let tagSet = new Set();
                        coins.map((item) => {
                                if (item.tags.length) {
                                        item.tags.map((tag) => {
                                                tagSet.add(tag);
                                                setTags([...tagSet]);
                                        });
                                }
                        });
                }
        }, [coins]);
        useEffect(() => {
                let _coins = [];
                if (currentTag.length) {
                        coins.map((coin) => {
                                if (coin.tags.includes(currentTag)) {
                                        _coins.push(coin);
                                }
                        });
                } else {
                        _coins.push(...coins);
                }
                setCurrentCoins(_coins);
        }, [currentTag, coins]);

        const handleTagClick = (e) => {
                console.log(e.target.id, "Clicked!");
                if (e.target.id === currentTag) {
                        setCurrentTag("");
                } else {
                        setCurrentTag(e.target.id);
                }
        };

        return (
                <div
                        style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                        }}
                >
                        <ul style={{ marginInline: 20 }}>
                                {tags.map((tag) => {
                                        return (
                                                <button
                                                        id={tag}
                                                        style={{
                                                                paddingRight: 15,
                                                                paddingLeft: 15,
                                                                marginInlineEnd: 15,
                                                                marginBlockEnd: 10,
                                                                height: 30,
                                                                borderRadius: 10,
                                                                borderWidth: 1,
                                                                cursor: "pointer",
                                                                backgroundColor:
                                                                        currentTag ===
                                                                        tag
                                                                                ? "#E74F86"
                                                                                : "#FFFFFF",
                                                        }}
                                                        onClick={(e) =>
                                                                handleTagClick(
                                                                        e
                                                                )
                                                        }
                                                >
                                                        {tag}
                                                </button>
                                        );
                                })}
                        </ul>
                        <ul>
                                {currentTableData.map((coin) => {
                                        const {
                                                name,
                                                fullName,
                                                price,
                                                dayChange,
                                                id,
                                        } = coin;
                                        return (
                                                <Link
                                                        to={`/${name}`}
                                                        style={{
                                                                textDecoration:
                                                                        "none",
                                                                maxWidth: 500,
                                                                minWidth: 300,
                                                                display: "flex",
                                                                justifyContent:
                                                                        "space-between",
                                                                borderColor:
                                                                        "black",
                                                                borderWidth: 1,
                                                                borderStyle:
                                                                        "solid",
                                                                borderRadius: 10,
                                                                paddingInline: 10,
                                                                marginBlockEnd: 10,
                                                                marginInline:
                                                                        "auto",
                                                                backgroundColor:
                                                                        "#BFC0FF",
                                                                color: "black",
                                                        }}
                                                >
                                                        <div
                                                                style={{
                                                                        marginRight: 10,
                                                                }}
                                                        >
                                                                <p>
                                                                        {
                                                                                fullName
                                                                        }
                                                                </p>
                                                                <p>{name}</p>
                                                        </div>
                                                        <div>
                                                                <p>{price}</p>
                                                                <p>
                                                                        {
                                                                                dayChange
                                                                        }
                                                                </p>
                                                        </div>
                                                </Link>
                                        );
                                })}
                        </ul>
                        <Pagination
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={currentCoins.length}
                                pageSize={PageSize}
                                onPageChange={(page) => setCurrentPage(page)}
                        />
                </div>
        );
};

export default CoinList;
