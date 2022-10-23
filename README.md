<p align="center">
  <a href="https://gist.github.com/shinkeonkim/5a61214fe052be0e3ecf9654ef7274f6">
    <img src="https://user-images.githubusercontent.com/47373998/197399629-7be83381-67cb-4af6-bb6e-c22620409808.png" width="50%">
  </a>
  <h3 align="center">Army Tiger</h3>
  <p align="center"> 🪖 군대 일정을 Github 프로필에 남겨둘 수 있어요</p>
</p>

---

## 사전 작업

1. public GitHub Gist를 하나 생성합니다. (https://gist.github.com/new)
2. `gist`와 `repo` 권한을 가진 Github 토큰을 생성하고, 복사합니다. (https://github.com/settings/tokens/new)

## 프로젝트 세팅

1. 이 Repository를 Fork 합니다.
2. Fork한 Repository의 **Settings > Secrets > Actions** 으로 이동합니다.
3.  **New Repository secret** 버튼을 눌러 Github 토큰을 넣습니다.
  - **GH_TOKEN:** 위 과정에서 생성한 GitHub token
4. **Actions** 탭에서 wokrflow을 활성화합니다.
5. `.github/workflows/run.yml` 파일에서 환경변수를 수정해주세요.
    - **GIST_ID:** 예를 들어, `https://gist.github.com/shinkeonkim/`**`5a61214fe052be0e3ecf9654ef7274f6`**.
    - **START_AT:** 입대일을 남깁니다.
    - **END_AT:** 전역(예정)일을 남깁니다. 전역일을 계산하는 기능은 지원하지 앖습니다. 😂 [전역일 계산기](http://soldiercal.lilysoul.pe.kr/) 등을 이용해주세요.
6. 매일 자정마다 정보가 갱신됩니다.

## References

[bokub/github-stats-box](https://github.com/bokub/github-stats-box)
