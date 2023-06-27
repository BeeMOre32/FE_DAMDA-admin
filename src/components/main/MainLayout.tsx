import React, { useEffect } from 'react';
import Header from './Header';
import * as S from './style';
import TotalCard from './TotalCard';
import { useQuery } from '@tanstack/react-query';
import { getSubmitData } from '@/api/main';
import { MainData, Statistical } from '@/types/api/main';
import MainTable from './MainTable';
import Pagination from 'react-js-pagination';
import { PaginationContainer } from '../common/PaginationContainer/style';
import { formatDate } from './DateFormat';
import MatchingPopup from './MatchingPopup';

function MainLayout() {
  const [page, setPage] = React.useState(1);
  const [date, setDate] = React.useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null,
  });

  const { data: resData, refetch } = useQuery<MainData>(['MainData', date, page], () =>
    getSubmitData(page - 1, formatDate(date.startDate), formatDate(date.endDate)).then((res) => res.data),
  );

  const { statistical, content, total } = resData || {};

  const cardData = [
    { name: '예약/매니저 매칭중', label: 'matching' },
    { name: '매니저 매칭 수락 대기', label: 'waiting' },
    { name: '서비스 예약 확정', label: 'confirmation' },
    { name: '서비스 완료', label: 'completed' },
    { name: '예약 취소', label: 'cancellation' },
  ];

  useEffect(() => {
    refetch(); // 페이지번호가 변경될 때 데이터 다시 불러오기
  }, [page, refetch]);

  useEffect(() => {
    setPage(1); // 날짜필터가 변경되면 페이지를 1로 리셋
  }, [date, refetch]);

  return (
    <S.MainSection>
      <Header date={date} setDate={setDate} />
      <S.TotalCardContainer>
        {statistical &&
          cardData.map((card) => (
            <TotalCard
              key={card.name}
              Total={statistical?.[card.label as keyof Statistical] || 0}
              CardName={card.name}
            />
          ))}
      </S.TotalCardContainer>
      <MainTable Content={content} />
      <PaginationContainer>
        <Pagination
          hideFirstLastPages={true}
          linkClassPrev="prev"
          linkClassNext="next"
          activePage={resData ? page : 1}
          itemsCountPerPage={10}
          totalItemsCount={total || 1}
          pageRangeDisplayed={total ? Math.ceil(total / 10) : 1}
          onChange={(pageNumber) => setPage(pageNumber)}
        />
      </PaginationContainer>

    </S.MainSection>
  );
}

export default MainLayout;
