import React from 'react';

const PrivacyPolicyPage = () => {
    return (
        <div className="privacy-policy-container">
            <h1 className="policy-title">개인정보처리방침</h1>
            <p className="policy-date">시행일자: 2025년 11월 13일</p>
            
            <section className="policy-section">
                <h2>1. 개인정보의 수집 및 이용 목적</h2>
                <p>회사는 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음 목적 이외의 용도로는 이용하지 않습니다.</p>
                <ul>
                    <li>회원 가입 및 관리: 서비스 이용 의사 확인, 회원제 서비스 제공에 따른 본인 식별/인증, 회원자격 유지/관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정 이용 방지 등</li>
                    <li>서비스 제공: 차량 정보, 주차 예약, 뉴스 제공 등 계약의 이행 및 서비스 제공에 따른 요금 정산, 콘텐츠 제공 등</li>
                </ul>
            </section>

            <section className="policy-section">
                <h2>2. 수집하는 개인정보 항목</h2>
                <p>회사는 회원가입, 서비스 이용, 상담 등을 위해 다음과 같은 개인정보를 수집합니다.</p>
                <ul>
                    <li>필수 항목: 성명, 이메일 주소, 비밀번호, 휴대전화번호</li>
                    <li>선택 항목: 차량 번호, 주차 위치 정보, 관심사</li>
                </ul>
            </section>

            <section className="policy-section">
                <h2>3. 개인정보의 보유 및 이용 기간</h2>
                <p>회사는 법령에 따른 개인정보 보유/이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유/이용 기간 내에서 개인정보를 처리 및 보유합니다.</p>
                <ul>
                    <li>회원 정보: 회원 탈퇴 시까지</li>
                    <li>계약 및 청약철회 등에 관한 기록: 5년 (전자상거래 등에서의 소비자 보호에 관한 법률)</li>
                </ul>
            </section>
            
            <section className="policy-section">
                <h2>4. 개인정보의 제3자 제공</h2>
                <p>회사는 정보주체의 개인정보를 제1조(개인정보의 수집 및 이용 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」이 정하는 경우에만 개인정보를 제3자에게 제공합니다.</p>
            </section>
            
            <section className="policy-section">
                <h2>5. 개인정보 보호책임자</h2>
                <p>개인정보 보호법 제31조 제1항에 따른 개인정보 보호책임자는 다음과 같습니다.</p>
                <dl className="policy-contact">
                    <dt>성명</dt>
                    <dd>김정보</dd>
                    <dt>직책</dt>
                    <dd>개인정보 보호팀장</dd>
                    <dt>연락처</dt>
                    <dd>privacy@carscope.com</dd>
                </dl>
            </section>
        </div>
    );
};

export default PrivacyPolicyPage;