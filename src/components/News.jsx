import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import {useGetCryptosQuery} from "../services/cryptoApi"
import Loader from './Loader';
const { Text, Title } = Typography;
const { Option } = Select;

const demoImageUrl = "https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbk04RVljVzdZaE0zS295d1d2VzBPdUtyVktwd3xBQ3Jtc0trWFR1QjlPcUpHUDVtX1EtM1hNWVgzMVBGN3h4enZyY3FmRmRHNzBNNEtndS1CRjIyVExfMDB6cTg5Ri1CYkZXUTRTOUJPbFR0RVNMM1o4MFRmMnA1TUtqT1lOdFIzVGZmdXItMUs4X19HVWlvN01CWQ&q=https%3A%2F%2Fwww.bing.com%2Fth%3Fid%3DOVFT.mpzuVZnv8dwIMRfQGPbOPC%26pid%3DNews";

const News = ({ simplified }) => {

    const [newsCategory,setNewsCategory] = useState('Cryptocurrency');
    const {data} = useGetCryptosQuery(100);
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: newsCategory, count: simplified ? 6 : 12 })

    if (!cryptoNews?.value) return <Loader/>;

    return (
        <div>
            <Row gutter={[24, 24]}>
                {!simplified && (
                    <Col span={24}>
                        <Select
                            showSearch
                            className="select-news"
                            placeholder="Select a crypto"
                            optionFilterProp="children"
                            onChange={(value) => setNewsCategory(value)}
                            filterOption={((input,option)=> option.children.toLowerCase().indexOf(input.toLocaleLowerCase()) >= 0)}
                        >
                            <Option value="Cryptocurrency">All Crypto</Option>
                            {data?.data?.coins.map((coin) => (
                                <Option value={coin.name}>{coin.name}</Option>
                            ))}
                        </Select>
                    </Col>
                )}
                {cryptoNews.value.map((news, i) => (
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <Card hoverable className="news-card">
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div className="news-image-container">
                                    <Title className="news-title" level={4}>{news.name}</Title>
                                    <img style={{maxWidth:'100px', maxHeight:'100px'}} src={news?.image?.thumbnail?.contentUrl || demoImageUrl} alt="news" />
                                </div>
                                <p>
                                    {news.description > 100 ? `${news.description.substring(0, 100)}..` : news.description}
                                </p>
                                <div className="provider-container">
                                    <div>
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImageUrl} />
                                        <Text className="provider-name">{news.provider[0]?.name}</Text>
                                    </div>
                                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default News
