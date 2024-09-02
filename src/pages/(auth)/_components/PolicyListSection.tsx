import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import useWindowStore, { WINDOW_VIEWS } from "@/stores/useWindowStore";

import { Button } from "@/components";
import { Check } from "@/components/icons";
import { cn } from "@/lib/utils";

const POLICY_CONTENT_LIST: Array<{
  content: string;
  // policyView: WINDOW_VIEWS;
  required: boolean;
  formKey:
    | "isPersonalInfoConsented"
    | "isLocationInfoConsented"
    | "isUnderAgeConsentConfirmed";
  policyView: WINDOW_VIEWS;
  url: string;
}> = [
  {
    content: "[필수] 개인정보 수집 및 이용 동의",
    required: true,
    formKey: "isPersonalInfoConsented",
    policyView: "POLICY_PERSONAL",
    url: "/policy/personal",
  },
  {
    content: "[필수] 플레이스, 플레이스 스토어 이용 약관",
    required: true,
    formKey: "isLocationInfoConsented",
    policyView: "POLICY_STORE",
    url: "/policy/store",
  },
  {
    content: "[필수] 만 14세 미만 가입 제한",
    required: true,
    formKey: "isUnderAgeConsentConfirmed",
    policyView: "POLICY_AGE",
    url: "/policy/age",
  },
  {
    content: "[선택] 마케팅 활용 및 광고성 정보 수신 동의",
    required: false,
    formKey: "isUnderAgeConsentConfirmed",
    policyView: "POLICY_AD",
    url: "/policy/ad",
  },
];

interface PolicyListSectionProps {
  setPolicyConfirm: Dispatch<SetStateAction<boolean>>;
}

const PolicyListSection = ({ setPolicyConfirm }: PolicyListSectionProps) => {
  const [checkAllPolicy, setCheckAllPolicy] = useState(false);
  const [policyCheck, setPolicyCheck] = useState<Array<boolean>>([
    false,
    false,
    false,
    false,
  ]);

  // const {
  //   closeWindow,
  //   displayWindow,
  //   openWindow,
  //   setWindowURL,
  //   setWindowView,
  // } = useWindowStore();

  useEffect(() => {
    if (policyCheck.slice(0, -1).every(isTrue => isTrue))
      setPolicyConfirm(true);
    else setPolicyConfirm(false);

    if (policyCheck.every(isTrue => isTrue)) {
      setCheckAllPolicy(true);
    } else {
      setCheckAllPolicy(false);
    }
  }, [policyCheck]);

  const togglePolicyAccept = (index: number) => {
    const newState = policyCheck.map((policy, i) => {
      if (i === index) {
        return !policy;
      }
      return policy;
    });

    setPolicyCheck(newState);
  };

  const toggleAllPolicy = () => {
    if (checkAllPolicy) {
      const newState = new Array(POLICY_CONTENT_LIST.length).fill(false);
      setPolicyCheck(newState);
    } else {
      const newState = new Array(POLICY_CONTENT_LIST.length).fill(true);
      setPolicyCheck(newState);
    }
  };

  const handleShowPolicy = (view: WINDOW_VIEWS, url: string) => {
    // setWindowView(view);
    // setWindowURL(url);
    // if (displayWindow) {
    //   closeWindow();
    // }
    // setTimeout(() => openWindow(), 100);
    // return;
  };

  return (
    <section className="w-full mt-16">
      <AllPolicyCheckArea>
        <Button
          id="checkAll"
          variant="ghost"
          size="icon"
          onClick={() => {
            setCheckAllPolicy(!checkAllPolicy);
            toggleAllPolicy();
          }}
          className={cn(
            "w-7 h-7 mb-1",
            checkAllPolicy ? "bg-primary" : "bg-primary/50",
          )}
        >
          <Check
            className={cn(
              "w-4 h-4",
              checkAllPolicy ? "stroke-white" : "stroke-primary/50",
            )}
            strokeWidth={3.5}
          />
        </Button>
        <label htmlFor="checkAll" className="ml-2 cursor-pointer">
          <span className="font-bold text-xl">모든 약관 동의하기</span>
        </label>
      </AllPolicyCheckArea>

      <PolicyListWrapper>
        <ul className="space-y-4">
          {POLICY_CONTENT_LIST.map((policy, index) => (
            <li key={index}>
              <PolicyItem>
                {/* Accept Polciy */}
                <button onClick={() => togglePolicyAccept(index)}>
                  <div className="flex flex-row space-x-4">
                    <Check
                      className={cn(
                        "w-3 h-3 mx-auto my-auto transition-colors",
                        policyCheck[index]
                          ? "stroke-primary"
                          : "stroke-primary-foreground",
                      )}
                      strokeWidth={3.5}
                    />
                    <span
                      className={cn(
                        policyCheck[index]
                          ? "text-primary"
                          : "text-primary-foreground",
                      )}
                    >
                      {policy.content}
                    </span>
                  </div>
                </button>
                {/* Show Policy */}
                <button
                  onClick={() => {
                    handleShowPolicy(policy.policyView, policy.url);
                  }}
                >
                  <PolicySeeMoreText>자세히</PolicySeeMoreText>
                </button>
              </PolicyItem>
            </li>
          ))}
        </ul>
      </PolicyListWrapper>
    </section>
  );
};

export default PolicyListSection;

export const AllPolicyCheckArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`;

export const PolicyListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.4rem;
`;

export const PolicyItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${tw`space-x-2 text-sm`}
`;

export const PolicySeeMoreText = styled.span`
  color: var(--primary-foreground);
  text-decoration: underline;
  text-underline-offset: 3;
`;
