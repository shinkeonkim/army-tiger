<p align="center">
  <a href="https://gist.github.com/shinkeonkim/5a61214fe052be0e3ecf9654ef7274f6">
    <img src="https://user-images.githubusercontent.com/47373998/197399629-7be83381-67cb-4af6-bb6e-c22620409808.png" width="50%">
  </a>
  <h3 align="center">Army Tiger</h3>
  <p align="center"> ๐ช ๊ตฐ๋ ์ผ์ ์ Github ํ๋กํ์ ๋จ๊ฒจ๋ ์ ์์ด์</p>
</p>

---

## ์ฌ์  ์์

1. public GitHub Gist๋ฅผ ํ๋ ์์ฑํฉ๋๋ค. (https://gist.github.com/new)
2. `gist`์ `repo` ๊ถํ์ ๊ฐ์ง Github ํ ํฐ์ ์์ฑํ๊ณ , ๋ณต์ฌํฉ๋๋ค. (https://github.com/settings/tokens/new)

## ํ๋ก์ ํธ ์ธํ

1. ์ด Repository๋ฅผ Fork ํฉ๋๋ค.
2. Forkํ Repository์ **Settings > Secrets > Actions** ์ผ๋ก ์ด๋ํฉ๋๋ค.
3.  **New Repository secret** ๋ฒํผ์ ๋๋ฌ Github ํ ํฐ์ ๋ฃ์ต๋๋ค.
  - **GH_TOKEN:** ์ ๊ณผ์ ์์ ์์ฑํ GitHub token
4. **Actions** ํญ์์ wokrflow์ ํ์ฑํํฉ๋๋ค.
5. `.github/workflows/run.yml` ํ์ผ์์ ํ๊ฒฝ๋ณ์๋ฅผ ์์ ํด์ฃผ์ธ์.
    - **GIST_ID:** ์๋ฅผ ๋ค์ด, `https://gist.github.com/shinkeonkim/`**`5a61214fe052be0e3ecf9654ef7274f6`**.
    - **START_AT:** ์๋์ผ์ ๋จ๊น๋๋ค.
    - **END_AT:** ์ ์ญ(์์ )์ผ์ ๋จ๊น๋๋ค. ์ ์ญ์ผ์ ๊ณ์ฐํ๋ ๊ธฐ๋ฅ์ ์ง์ํ์ง ์์ต๋๋ค. ๐ [์ ์ญ์ผ ๊ณ์ฐ๊ธฐ](http://soldiercal.lilysoul.pe.kr/) ๋ฑ์ ์ด์ฉํด์ฃผ์ธ์.
6. ๋งค์ผ ์์ ๋ง๋ค ์ ๋ณด๊ฐ ๊ฐฑ์ ๋ฉ๋๋ค.

## References

[bokub/github-stats-box](https://github.com/bokub/github-stats-box)
