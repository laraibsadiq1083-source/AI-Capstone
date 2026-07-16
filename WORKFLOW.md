## Comparison Between Round 1 and Round 2

| Round 1 (Vague Prompt) | Round 2 (Detailed Prompt) |
|-------------------------|---------------------------|
| Very simple prompt | Detailed prompt |
| Basic UI | More professional UI |
| No Password field | Password field added |
| No required (*) fields | Required fields marked (*) |
| No validation guidance | Password validation guidance |
| Simple interface | Better structure and usability |
| Less complete | More complete |
# Workflow Comparison

## Overview

For this assignment, I built the same settings form twice using two different AI prompting approaches in Cursor. The purpose was to compare how the quality of the AI-generated code changes when using a vague prompt versus a detailed prompt.

## Round One – Vague Prompt

For the first attempt, I used the simple prompt:

> Create a settings form.

I intentionally provided almost no instructions. Cursor generated a basic settings page containing fields such as Display Name, Email Address, Theme, Language, and Timezone. The interface looked clean, but it lacked several important features. There was no password field, no indication of required fields, no validation rules, and no guidance for users when entering information. The generated code required more manual review because it did not fully meet the expectations of a complete settings form.

## Round Two – Detailed Prompt

For the second attempt, I started a completely new Cursor chat to avoid carrying over context from the first round. This time I provided detailed requirements, including validation, accessibility, required fields, password requirements, and verification. The generated settings form was much more complete. It included a password field, required field indicators, better organization, and password guidance stating that it must contain at least eight characters. The overall structure was more professional and closer to a real-world application.

## Comparison

The difference between the two approaches was clear. The first version produced only a basic user interface, while the second version generated a more complete and organized implementation. The detailed prompt resulted in cleaner code, improved accessibility, better usability, and less manual review effort. Although writing the second prompt took a little longer, it reduced the amount of time needed to review and improve the generated code.

## AI Mistake I Caught

One mistake I noticed in the first version was that the AI generated only a basic interface without including password functionality or validation. A real settings form should include these features, so I identified this during review. The second prompt corrected this issue by providing clear requirements.

## What I Learned

This exercise showed me that prompt quality has a significant impact on AI-generated code. A vague prompt can produce a basic result, but a detailed prompt with clear requirements, constraints, and verification leads to more accurate, organized, and reliable code. In future projects, I will use detailed prompts and always review AI-generated code before accepting it.