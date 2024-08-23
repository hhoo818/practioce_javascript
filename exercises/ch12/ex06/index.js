import { readdirSync, statSync } from "fs";
import { join, resolve } from "path";
export function* walk(rootPath) {
    const absolutePath = resolve(rootPath); // パスを絶対パスに変換(最初から絶対パスで書いたほうがわかりやすい)
    const items = readdirSync(absolutePath);
    for (const item of items) {
        const itemPath = join(rootPath, item);
        const isDirectory = statSync(itemPath).isDirectory();
        yield { path: itemPath, isDirectory: isDirectory };
        if (isDirectory) {
            yield* walk(itemPath);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLElBQUksQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQU9yQyxNQUFNLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFnQjtJQUNwQyxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxvQ0FBb0M7SUFDNUUsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3hDLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO1FBQ3hCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEMsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JELE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsQ0FBQztRQUNuRCxJQUFJLFdBQVcsRUFBRTtZQUNmLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN2QjtLQUNGO0FBQ0gsQ0FBQyJ9