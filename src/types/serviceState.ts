export type ServiceStateType =
  | 'WAITING_FOR_MANAGER_REQUEST'
  | 'WAITING_FOR_ACCEPT_MATCHING'
  | 'MANAGER_MATCHING_COMPLETED'
  | 'SERVICE_COMPLETED'
  | 'RESERVATION_CANCELLATION';

export enum ServiceState {
  WAITING_FOR_MANAGER_REQUEST = '매칭중...',
  WAITING_FOR_ACCEPT_MATCHING = '매칭수락 대기 ▼',
  MANAGER_MATCHING_COMPLETED = '서비스 예약 확정',
  SERVICE_COMPLETED = '서비스 완료',
  RESERVATION_CANCELLATION = '예약 취소',
}
