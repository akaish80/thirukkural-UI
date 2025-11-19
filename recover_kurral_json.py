#!/usr/bin/env python3
"""
Recover JSON objects from a corrupted JSON file by extracting brace-balanced
objects and attempting to parse them. Applies small safe repairs (remove
trailing commas before closing braces/brackets) and writes a cleaned JSON
array and a recovery report.

Usage:
    python recover_kurral_json.py --input src/Common/kurral_data.json \
        --output src/Common/kurral_data.cleaned.json \
        --report src/Common/kurral_data.recovery_report.txt

This is a best-effort tool. It preserves objects that successfully parse and
skips fragments that can't be parsed after simple repairs. Review the
report for any failures.
"""

import argparse
import json
import re
import sys
from pathlib import Path


def extract_objects(text):
    objs = []
    i = 0
    n = len(text)
    while i < n:
        # find next '{'
        start = text.find('{', i)
        if start == -1:
            break
        depth = 0
        in_string = False
        escape = False
        j = start
        while j < n:
            ch = text[j]
            if in_string:
                if escape:
                    escape = False
                elif ch == '\\':
                    escape = True
                elif ch == '"':
                    in_string = False
            else:
                if ch == '"':
                    in_string = True
                elif ch == '{':
                    depth += 1
                elif ch == '}':
                    depth -= 1
                    if depth == 0:
                        # end of object
                        objs.append(text[start:j+1])
                        i = j+1
                        break
            j += 1
        else:
            # ran out of text while scanning; stop
            break
    return objs


def simple_repair(fragment):
    # 1) remove trailing commas before } or ]
    repaired = re.sub(r',\s*([}\]])', r"\1", fragment)
    # 2) replace CR characters that might be literal newlines inside strings
    #    (rare) with escaped \n. If there are actual unescaped newlines inside
    #    quotes they will break json.loads; this attempts to escape them.
    def escape_newlines_in_strings(s):
        out = []
        in_string = False
        esc = False
        for ch in s:
            if in_string:
                if esc:
                    out.append(ch)
                    esc = False
                elif ch == '\\':
                    out.append(ch)
                    esc = True
                elif ch == '"':
                    out.append(ch)
                    in_string = False
                elif ch == '\n' or ch == '\r':
                    out.append('\\n')
                else:
                    out.append(ch)
            else:
                out.append(ch)
                if ch == '"':
                    in_string = True
        return ''.join(out)

    repaired = escape_newlines_in_strings(repaired)

    return repaired


def main():
    p = argparse.ArgumentParser(description='Recover JSON objects from a corrupted file')
    p.add_argument('--input', '-i', required=True)
    p.add_argument('--output', '-o', default='src/Common/kurral_data.cleaned.json')
    p.add_argument('--report', '-r', default='src/Common/kurral_data.recovery_report.txt')
    args = p.parse_args()

    inp = Path(args.input)
    if not inp.exists():
        print(f"ERROR: input file not found: {inp}")
        sys.exit(2)

    text = inp.read_text(encoding='utf-8', errors='replace')
    print(f"Read {len(text)} chars from {inp}")

    fragments = extract_objects(text)
    print(f"Extracted {len(fragments)} object fragments")

    recovered = []
    failures = []

    for idx, frag in enumerate(fragments, start=1):
        # try raw parse
        try:
            obj = json.loads(frag)
            recovered.append(obj)
            continue
        except Exception as e_raw:
            # try simple repairs
            frag2 = simple_repair(frag)
            try:
                obj = json.loads(frag2)
                recovered.append(obj)
                continue
            except Exception as e_rep:
                # keep both errors for report
                failures.append({
                    'index': idx,
                    'error_raw': str(e_raw),
                    'error_repaired': str(e_rep),
                    'snippet': frag[:400].replace('\n', '\\n') + ('...' if len(frag) > 400 else '')
                })

    out_path = Path(args.output)
    report_path = Path(args.report)

    # write cleaned json array
    out_path.parent.mkdir(parents=True, exist_ok=True)
    with out_path.open('w', encoding='utf-8') as f:
        json.dump(recovered, f, ensure_ascii=False, indent=2)

    # write report
    with report_path.open('w', encoding='utf-8') as f:
        f.write(f"Source: {inp}\n")
        f.write(f"Total fragments extracted: {len(fragments)}\n")
        f.write(f"Successfully recovered objects: {len(recovered)}\n")
        f.write(f"Failed fragments: {len(failures)}\n\n")
        for fail in failures:
            f.write(f"--- Fragment index: {fail['index']}\n")
            f.write(f"error_raw: {fail['error_raw']}\n")
            f.write(f"error_repaired: {fail['error_repaired']}\n")
            f.write(f"snippet: {fail['snippet']}\n\n")

    print(f"Wrote cleaned JSON to {out_path} with {len(recovered)} objects")
    print(f"Wrote report to {report_path} with {len(failures)} failures")


if __name__ == '__main__':
    main()
