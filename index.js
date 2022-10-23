#!/usr/bin/env node
'use strict';

require('dotenv').config();
const { request } = require('@octokit/request');
const { userInfoFetcher } = require('./fetch');
const differenceInDays = require('date-fns/differenceInDays')

const GIST_ID = process.env.GIST_ID;
const GITHUB_TOKEN = process.env.GH_TOKEN;
const START_AT = process.env.START_AT;
const END_AT = process.env.END_AT;

const getKoDate = (date) => {
  const ret = new Date(date.getTime() + (date.getTimezoneOffset() * 60 * 1000));

  // 자정마다 GH Action이 돌고, 3시간의 여유를 두어 오차를 줄이도록 함.
  return new Date(ret.getFullYear(), ret.getMonth(), ret.getDate(), 12, 0, 0, 0);
}

const getToday = () => {
  const current = new Date();

  return getKoDate(current);
}

const getStartAt = () => {
  const startAt = new Date(START_AT);

  return getKoDate(startAt);
}

const getEndAt = () => {
  const endAt = new Date(END_AT);

  return getKoDate(endAt);
}

const now = getToday();
const startAt = getStartAt();
const endAt = getEndAt();


const main = async () => {
  if (!GIST_ID) {
    throw new Error('GIST_ID is not defined');
  }
  if (!GITHUB_TOKEN) {
    throw new Error('GH_TOKEN is not defined');
  }
  if (!START_AT) {
    throw new Error('START_AT is not defined');
  }
  if (!END_AT) {
    throw new Error('END_AT is not defined');
  }
  if (getStartAt() > getEndAt()) {
    throw new Error('START_AT, END_AT is not valid');
  }

  try {
    await updateGist();
  } catch (e) {
    throw new Error(`cannot update gist: ${e.message}`);
  }
}

const isPreviousEnlistment = () => {
  return now.getTime() < startAt.getTime();
}

const isEnlistInMilitaryToday = () => {
  return now.getTime() === startAt.getTime();
}

const isDischargedFromArmyToday = () => {
  return endAt.getTime() <= now.getTime();
}

const isServingInMilitary = () => {
  return startAt.getTime() < now.getTime() && now.getTime() < endAt.getTime();
}

const leftDayToEnlistment = () => {
  return differenceInDays(startAt, now);
}

const leftDayToDischarging = () => {
  return differenceInDays(endAt, now);
}

const getUsername = async () => {
  const user = await userInfoFetcher(GITHUB_TOKEN).then((res) => res.data.data.viewer);

  return user.name || user.login;
}

const updateGist = async () => {
  const username = await getUsername();
  const now = getToday();
  const startAt = getStartAt();
  const endAt = getEndAt();

  console.info('now', now);
  console.info('startAt', startAt);
  console.info('endAt', endAt);

  let msg = ''

  if(isPreviousEnlistment()) {
    msg = `🐥 입대까지 ${leftDayToEnlistment()}일 남았어요.`;
  } else if(isEnlistInMilitaryToday()) {
    msg = '💪 오늘 입대합니다.';
  } else if(isDischargedFromArmyToday()) {
    msg = '🎉 전역을 축하합니다!';
  } else if(isServingInMilitary()) {
    msg = `🪖 전역까지 ${leftDayToDischarging()}일 남았어요!`;
  }

  const gistContent = [
    msg,
    `🗓 입대일: ${START_AT}`,
    `🗓 전역일: ${END_AT}`,
  ].join('\n') + '\n';

  console.log(gistContent);

  const gist = await request('GET /gists/:gist_id', {
    gist_id: GIST_ID,
    headers: { authorization: `token ${GITHUB_TOKEN}` },
  });
  const filename = Object.keys(gist.data.files)[0];

  if (gist.data.files[filename].content === gistContent) {
    console.info('Nothing to update');
    return;
  }

  return request('PATCH /gists/:gist_id', {
    files: {
      [filename]: {
        filename: `${username}'s Army Stats`,
        content: gistContent,
      },
    },
    gist_id: GIST_ID,
    headers: { authorization: `token ${GITHUB_TOKEN}` },
  }).then(() => {
      console.info(`Updated Gist ${GIST_ID} with the following content:\n${gistContent}`);
  });
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
