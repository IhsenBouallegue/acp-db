"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const manufacturingSites = ["Brazil", "Canada", "China", "France", "Germany", "Mexico", "USA"];

// Mock tool data
const toolOptions = [
  { id: 1, name: "Tool A", designNumber: "T001" },
  { id: 2, name: "Tool B", designNumber: "T002" },
  { id: 3, name: "Tool C", designNumber: "T003" },
];

const productSchema = z.object({
  width: z.string(),
  thickness: z.string(),
  elongation: z.string(),
  symmetry: z.string(),
  preMaterialQuality: z.string(),
  preMaterialThickness: z.string(),
  preMaterialWidth: z.string(),
  coating: z.string(),
  materialWeight: z.string(),
  elongationPercentage: z.string(),
  tearStrength: z.string(),
  applicationInfo: z.string(),
  designNumber: z.string(),
  manufacturingSite: z.string(),
  linkedTools: z.array(z.number()).optional(),
});

const toolSchema = z.object({
  web: z.string(),
  notch: z.string(),
  louverWidth: z.string(),
  designNumber: z.string(),
  toolWidth: z.string(),
  toolSetNumber: z.string(),
  manufacturingSite: z.string(),
});

type FormSchema = z.infer<typeof productSchema> | z.infer<typeof toolSchema>;

export function MasterDataForm({
  type,
  onSubmit,
}: { type: "products" | "tools"; onSubmit: (data: FormSchema) => void }) {
  const schema = type === "products" ? productSchema : toolSchema;
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const fields =
    type === "products"
      ? [
          { name: "width", label: "Width", type: "number" },
          { name: "thickness", label: "Thickness", type: "number" },
          { name: "elongation", label: "Elongation", type: "number" },
          { name: "symmetry", label: "Symmetry", type: "text" },
          { name: "preMaterialQuality", label: "Pre-Material Quality", type: "text" },
          { name: "preMaterialThickness", label: "Pre-Material Thickness", type: "number" },
          { name: "preMaterialWidth", label: "Pre-Material Width", type: "number" },
          { name: "coating", label: "Coating", type: "text" },
          { name: "materialWeight", label: "Material Weight", type: "number" },
          { name: "elongationPercentage", label: "Elongation (%)", type: "number" },
          { name: "tearStrength", label: "Tear Strength", type: "number" },
          { name: "applicationInfo", label: "Application Information", type: "textarea" },
          { name: "designNumber", label: "Design Number", type: "text" },
          { name: "manufacturingSite", label: "Manufacturing Site", type: "select" },
        ]
      : [
          { name: "web", label: "Web", type: "number" },
          { name: "notch", label: "Notch", type: "number" },
          { name: "louverWidth", label: "Louver Width", type: "number" },
          { name: "designNumber", label: "Design Number", type: "text" },
          { name: "toolWidth", label: "Tool Width", type: "number" },
          { name: "toolSetNumber", label: "Tool Set Number", type: "text" },
          { name: "manufacturingSite", label: "Manufacturing Site", type: "select" },
        ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {fields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              name={field.name as any}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    {field.type === "textarea" ? (
                      <Textarea {...formField} className="h-20" />
                    ) : field.type === "select" ? (
                      <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select manufacturing site" />
                        </SelectTrigger>
                        <SelectContent>
                          {manufacturingSites.map((site) => (
                            <SelectItem key={site} value={site}>
                              {site}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input type={field.type} {...formField} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        {type === "products" && (
          <FormField
            control={form.control}
            name="linkedTools"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Linked Tools</FormLabel>
                </div>
                {toolOptions.map((tool) => (
                  <FormField
                    key={tool.id}
                    control={form.control}
                    name="linkedTools"
                    render={({ field }) => {
                      return (
                        <FormItem key={tool.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(tool.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), tool.id])
                                  : field.onChange(field.value?.filter((value) => value !== tool.id));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {tool.name} ({tool.designNumber})
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
