import { readLines } from "./index.js";
describe("テスト", () => {
    test("test", () => {
        const filePath = "C:\\Users\\r00528257\\OneDrive - Ricoh\\ドキュメント\\javascript講座\\練習問題\\exercises-main-exercises\\exercises\\exercises\\ch12\\ex05\\test.txt";
        // ジェネレータ関数の動作テスト(長いと文字化けする)
        const reads = readLines(filePath, 100);
        expect(reads.next().value).toBe("こんにちは。");
        expect(reads.next().value).toBe("動作");
        expect(reads.next().value).toBe("テスト");
        expect(reads.next().value).toBe("をする。");
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUV2QyxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtJQUNuQixJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtRQUNoQixNQUFNLFFBQVEsR0FDWiwwSUFBMEksQ0FBQztRQUM3SSw0QkFBNEI7UUFDNUIsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=